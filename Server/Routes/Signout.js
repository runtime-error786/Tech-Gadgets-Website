const express = require('express');
const Out = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MYSQL } = require("../Models/dbconfig");

Out.use(bodyParser.json());
Out.use(cookieParser());

Out.get('/', async (req, res) => {
    const eshopToken = req.cookies['Eshop'];
    
    if (eshopToken) {
       console.log(eshopToken);
        try {
            await deleteTokenFromTable(eshopToken);
        } catch (error) {
            console.error('Error deleting token from table:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

   
    res.clearCookie('Eshop');
    res.clearCookie('GEshop');
    res.send('deleted');
});

async function deleteTokenFromTable(token) {
    const deleteQuery = 'DELETE FROM tokens WHERE token = ?';
    await MYSQL.query(deleteQuery, [token]);
}

module.exports = Out;
