const express = require('express');
const ShowAdmin = express.Router();
const bodyParser = require('body-parser');
const { MYSQL } = require("../Mysql");
const { Checkvalid } = require("../Middleware/Auth");

ShowAdmin.use(bodyParser.json());

ShowAdmin.get('/', Checkvalid, async (req, res) => {
    try {
        const userEmail = req.userEmail; 
        const query = "SELECT * FROM users WHERE email = ?";
        MYSQL.query(query, [userEmail], (err, result) => {
            if (err) {
                console.error('Error querying profile data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (result.length > 0) {
                    const profileData = result[0];
                    let profilePicUrl = null;
                    if (profileData.picturepath.startsWith("http://") || profileData.picturepath.startsWith("https://")) {
                        profilePicUrl = profileData.picturepath;
                    } else {
                        profilePicUrl = `http://localhost:2001/${profileData.picturepath.replace(/\\/g, '/')}`;
                    }
                    const responseData = {
                        profile: {
                            ...profileData,
                            profilePicUrl,
                        },
                    };
                    res.status(200).json(responseData);
                } else {
                    res.status(404).json({ error: 'Profile data not found' });
                }
            }
        });
    } catch (error) {
        console.error('Error fetching profile data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = ShowAdmin;
