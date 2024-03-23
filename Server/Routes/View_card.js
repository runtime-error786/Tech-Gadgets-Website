const express = require('express');
const ShowProductById = express.Router();
const { MYSQL } = require("../Mysql");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

ShowProductById.use(bodyParser.json());
ShowProductById.use(cookieParser());

ShowProductById.get('/', async (req, res) => {
    try {
        const productId = req.query.productId;
        const query = `
            SELECT 
                p.id, 
                p.name, 
                p.company, 
                p.quantity, 
                p.price, 
                p.description, 
                p.category, 
                p.imagepath,
                IFNULL(c.cartQty, 0) AS cartQty
            FROM products AS p
            LEFT JOIN (
                SELECT product_id, SUM(quantity) AS cartQty
                FROM cart
                WHERE product_id = ?
                GROUP BY product_id
            ) AS c ON p.id = c.product_id
            WHERE p.id = ?`;

        MYSQL.query(query, [productId, productId], async (err, results) => {
            if (err) {
                console.error("Error fetching product:", err);
                return res.status(500).json({ error: "Internal server error" });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: "Product not found" });
            }

            const product = results[0];
            product.imagepath = `http://localhost:2001/${product.imagepath.replace(/\\/g, '/')}`;

            const isInCart = async () => {
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

                    return rows.length > 0;
                } catch (error) {
                    console.error("Error querying cart:", error);
                    return false;
                }
            };

            const isLike = async () => {
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

                const likeQuery = "SELECT * FROM likes WHERE user_email = ? AND product_id = ?";
                const likeParams = [userEmail, productId];

                try {
                    const rows = await new Promise((resolve, reject) => {
                        MYSQL.query(likeQuery, likeParams, (err, rows) => {
                            if (err) {
                                console.error("Error querying likes:", err);
                                reject(err);
                            } else {
                                resolve(rows);
                            }
                        });
                    });

                    return rows.length > 0;
                } catch (error) {
                    console.error("Error querying likes:", error);
                    return false;
                }
            };

            const isInCartValue = await isInCart();
            const isLikeValue = await isLike();

            product.isInCart = isInCartValue;
            product.isLike = isLikeValue;
            product.cartbtn = isInCartValue ? "Already in Cart" : "Add to Cart";
            product.likebtn = isLikeValue;

            res.json(product);
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = ShowProductById;
