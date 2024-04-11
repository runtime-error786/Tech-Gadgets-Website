const express = require('express');
const AddLike = express.Router();
const { MYSQL } = require("../Models/dbconfig");
const jwt = require('jsonwebtoken');
const { Checkvalid } = require("../Middleware/Auth");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

AddLike.use(bodyParser.json());
AddLike.use(cookieParser());

AddLike.post('/', Checkvalid, async (req, res) => {
    try {
        console.log(req.body)
        const productId = req.body.productId;
        const userEmail = req.userEmail;
        const existingCartItem = await getlikeItem(userEmail, productId);
       
        if (existingCartItem) {
            await removelikeItem(userEmail, productId);
            res.status(200).json({ success: true, message: "Product like  removed  successfully" });
        } else {
            await insertlikeItem(userEmail, productId);
            res.status(200).json({ success: true, message: "Product like added successfully" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

async function getlikeItem(userEmail, productId) {
    const query = "SELECT * FROM likes WHERE user_email = ? AND product_id = ?";
    console.log("SQL Query:", query);

    try {
        const result = await new Promise((resolve, reject) => {
            MYSQL.query(query, [userEmail, productId], (err, result) => {
                if (err) {
                    console.error("Error executing query:", err);
                    reject(err);
                } else {
                    console.log("Result:", result);
                    resolve(result.length > 0 ? result[0] : null);
                }
            });
        });

        return result;
    } catch (error) {
       
        console.error("Error in getCartItem:", error);
        throw error;
    }
}



async function removelikeItem(userEmail, productId) {
    const query = "DELETE FROM likes WHERE user_email = ? AND product_id = ?";
    await MYSQL.query(query, [userEmail, productId]);
}

async function insertlikeItem(userEmail, productId) {
    const query = "INSERT INTO likes (user_email, product_id) VALUES (?, ?)";
    await MYSQL.query(query, [userEmail, productId]);
}

module.exports = AddLike;