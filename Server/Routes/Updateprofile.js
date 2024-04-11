const express = require('express');
const UpAdmin = express.Router();
const multer = require('multer');
const path = require('path');
const { Checkvalid } = require("../Middleware/Auth");
const { MYSQL } = require("../Models/dbconfig");
const bodyParser = require('body-parser');

UpAdmin.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadDir = './uploads';
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        callback(null, fileName);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
            callback(null, true);
        } else {
            callback(new Error('Only images are allowed')); 
        }
    }
});

UpAdmin.put('/', upload.single('image'), Checkvalid, async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, country, boolimg } = req.body;
        let picturepath = null;

        if ( boolimg && boolimg === 'true' && req.file) {
            picturepath = req.file.path;
        }

        let query = "UPDATE users SET name = ?, country = ?";
        const queryParams = [name, country];

        if (boolimg && boolimg === 'true') {
            query += ", picturepath = ?";
            queryParams.push(picturepath);
        }

        query += " WHERE email = ?";
        queryParams.push(email);

        MYSQL.query(query, queryParams, (err, result) => {
            if (err) {
                console.error('Error updating profile data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ success: 'Profile updated successfully' });
            }
        });
    } catch (error) {
        console.error('Error updating profile data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = UpAdmin;
