const express = require('express');
const CategoryProductQtySum = express.Router();
const bodyParser = require('body-parser');
const { MYSQL } = require("../Mysql");
const { Checkvalid } = require("../Middleware/Auth");
const cookieParser = require('cookie-parser');

CategoryProductQtySum.use(bodyParser.json());
CategoryProductQtySum.use(cookieParser());

CategoryProductQtySum.get('/', Checkvalid, async (req, res) => {
    try {
        const query = "SELECT category, SUM(quantity) AS productQtySum FROM products GROUP BY category";
        MYSQL.query(query, (err, result) => {
            if (err) {
                console.error('Error querying category with product quantity sum:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                const categoryProductQtySum = result.map(row => ({ category: row.category, productQtySum: row.productQtySum }));
                res.status(200).json(categoryProductQtySum);
            }
        });
    } catch (error) {
        console.error('Error getting category with product quantity sum:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = CategoryProductQtySum;
