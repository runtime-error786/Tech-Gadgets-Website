const express = require('express');
const ShowprodCus = express.Router();
const { MYSQL } = require("../Mysql");
const { Checkvalid } = require("../Middleware/Auth");

ShowprodCus.get('/', Checkvalid, async (req, res) => {
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
    
        MYSQL.query(query, queryParams, (err, results) => {
            if (err) {
                console.error("Error fetching products:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
    
            console.log("Products:", results); 
    
            results.forEach(product => {
                product.imagepath = `http://localhost:2001/${product.imagepath.replace(/\\/g, '/')}`;
            });
    
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
