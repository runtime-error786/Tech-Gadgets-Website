const express = require('express');
const ShowprodCus = express.Router();
const { MYSQL } = require("../Mysql");
const { Checkvalid } = require("../Middleware/Auth");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

ShowprodCus.use(bodyParser.json());
ShowprodCus.use(cookieParser());

ShowprodCus.get('/', async (req, res) => {
    try {
        const search = req.query.search; 
        const sort = req.query.sort === 'true' ? 'ASC' : 'DESC';
        let page = parseInt(req.query.page); 
        page = page + 1;
        const perPage = parseInt(req.query.perPage) || 5; 
    
        const offset = Math.max((page - 1) * perPage, 0);
    
        let query = `
            SELECT id, name, company, quantity, price, description, category, imagepath
            FROM products 
            WHERE LOWER(name) LIKE LOWER(?)
            ORDER BY price ${sort}
            LIMIT ?, ?`;
    
        const category = req.query.category;
        const queryParams = [`%${search}%`, offset, perPage];
    
        if (category && category !== 'all') {
            query = `
                SELECT id, name, company, quantity, price, description, category, imagepath
                FROM products 
                WHERE LOWER(name) LIKE LOWER(?) AND category = ?
                ORDER BY price ${sort}
                LIMIT ?, ?`;
            queryParams.splice(1, 0, category);
        }
    
        console.log("Query:", query); 
        console.log("Query parameters:", queryParams); 
    
        MYSQL.query(query, queryParams, async (err, results) => {
            if (err) {
                console.error("Error fetching products:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
    
            console.log("Products:", results); 
    
            const isInCart = async (productId) => {
                const token = req.cookies.Eshop || req.cookies.GEshop;
                if (!token) {
                    return false; 
                }
            
                let userEmail;
                try {
                    const decoded = jwt.decode(token, { complete: true });
                    if (decoded.payload.email) {
                        userEmail = decoded.payload.email;
                    } else if (decoded.payload.userId) {
                        userEmail = decoded.payload.userId;
                    } else {
                        return false; 
                    }
                } catch (error) {
                    console.error("Error decoding JWT token:", error);
                    return false; 
                }
            
                const cartQuery = "SELECT * FROM cart WHERE user_email = ? AND product_id = ?";
                const cartParams = [userEmail, productId];
            
                try {
                    const rows = await new Promise((resolve, reject) => {
                        MYSQL.query(cartQuery, cartParams, (err, rows) => {
                            if (err) {
                                console.error("Error querying cart:", err);
                                reject(err);
                            } else {
                                resolve(rows);
                            }
                        });
                    });
            
                    if (rows.length > 0) {
                        console.log("Product is present in the cart");
                        return true;
                    } else {
                        console.log("Product is not present in the cart");
                        return false;
                    }
                } catch (error) {
                    console.error("Error querying cart:", error);
                    return false;
                }
            };
            
            const isLike = async (productId) => {
                const token = req.cookies.Eshop || req.cookies.GEshop;
                if (!token) {
                    return false; 
                }
            
                let userEmail;
                try {
                    const decoded = jwt.decode(token, { complete: true });
                    if (decoded.payload.email) {
                        userEmail = decoded.payload.email;
                    } else if (decoded.payload.userId) {
                        userEmail = decoded.payload.userId;
                    } else {
                        return false; 
                    }
                } catch (error) {
                    console.error("Error decoding JWT token:", error);
                    return false; 
                }
            
                const cartQuery = "SELECT * FROM likes WHERE user_email = ? AND product_id = ?";
                const cartParams = [userEmail, productId];
            
                try {
                    const rows = await new Promise((resolve, reject) => {
                        MYSQL.query(cartQuery, cartParams, (err, rows) => {
                            if (err) {
                                console.error("Error querying cart:", err);
                                reject(err);
                            } else {
                                resolve(rows);
                            }
                        });
                    });
            
                    if (rows.length > 0) {
                        console.log("Product is present in the cart");
                        return true;
                    } else {
                        console.log("Product is not present in the cart");
                        return false;
                    }
                } catch (error) {
                    console.error("Error querying cart:", error);
                    return false;
                }
            };

            for (const product of results) {
                product.imagepath = `http://localhost:2001/${product.imagepath.replace(/\\/g, '/')}`;
                product.isInCart = await isInCart(product.id);
                product.isLike = await isLike(product.id);
                console.log(product.id,"addto cart",product.isInCart)
                product.cartbtn = product.isInCart ? "Already in Cart" : "Add to Cart";
                product.likebtn = product.isLike;
            }
    
            MYSQL.query("SELECT COUNT(*) AS total FROM products WHERE LOWER(name) LIKE LOWER(?) AND (category = ? OR ? = 'all')", [`%${search}%`, category, category], (err, countResult) => {
                if (err) {
                    console.error("Error fetching total count:", err);
                    return res.status(500).json({ error: "Internal server error" });
                }
            
                const total = countResult[0].total;
                const totalPages = Math.ceil(total / perPage); 
            
                res.json({ data: results, totalPages });
            });
            
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = ShowprodCus;
