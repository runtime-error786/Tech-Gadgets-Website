const express = require('express');
const Deladmin = express.Router();
const { MYSQL } = require("../Models/dbconfig");
let {Checkvalid} = require("../Middleware/Auth");

Deladmin.delete('/:id',Checkvalid, async (req, res) => {
    const userId = req.params.id;
    try {
        MYSQL.query(`DELETE FROM users WHERE id = ?`, [userId], (err, result) => {
            if (err) {
                console.error("Error deleting user:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                console.log(`User with ID ${userId} deleted successfully`);
                res.status(200).json({ message: "User deleted successfully" });
            }
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = Deladmin;
