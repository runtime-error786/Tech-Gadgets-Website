const express = require('express');
const Delprod = express.Router();
const { MYSQL } = require("../Mysql");
const { Checkvalid } = require("../Middleware/Auth");

Delprod.delete('/:id', Checkvalid, async (req, res) => {
    const productId = req.params.id;
    try {
        MYSQL.query(`DELETE FROM products WHERE id = ?`, [productId], (err, result) => {
            if (err) {
                console.error("Error deleting product:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                console.log(`Product with ID ${productId} deleted successfully`);
                res.status(200).json({ message: "Product deleted successfully" });
            }
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = Delprod;
