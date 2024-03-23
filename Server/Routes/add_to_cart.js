const express = require('express');
const AddToCart = express.Router();
const { MYSQL } = require("../Mysql");
const jwt = require('jsonwebtoken');
const { Checkvalid } = require("../Middleware/Auth");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

AddToCart.use(bodyParser.json());
AddToCart.use(cookieParser());

AddToCart.post('/', Checkvalid, async (req, res) => {
    try {
        console.log(req.body)
        const productId = req.body.productId;
        const userEmail = req.userEmail;
        const existingCartItem = await getCartItem(userEmail, productId);
        console.log("data at cart",existingCartItem);
        if (existingCartItem) {
            await removeCartItem(userEmail, productId);
            res.status(200).json({ success: true, message: "Product removed from cart successfully" });
        } else {
            await insertCartItem(userEmail, productId);
            res.status(200).json({ success: true, message: "Product added to cart successfully" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

async function getCartItem(userEmail, productId) {
    const query = "SELECT * FROM cart WHERE user_email = ? AND product_id = ?";
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




async function removeCartItem(userEmail, productId) {
    const query = "DELETE FROM cart WHERE user_email = ? AND product_id = ?";
    await MYSQL.query(query, [userEmail, productId]);
}

async function insertCartItem(userEmail, productId) {
    const query = "INSERT INTO cart (user_email, product_id) VALUES (?, ?)";
    await MYSQL.query(query, [userEmail, productId]);
}

module.exports = AddToCart;