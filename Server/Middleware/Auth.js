const jwt = require('jsonwebtoken');

let Checkvalid = (req, res, next) => {
    if (req.cookies.Eshop || req.cookies.GEshop) {
        let token;
        if (req.cookies.GEshop) {
            token = req.cookies.GEshop;
            const decoded = jwt.decode(token, { complete: true });
            req.userEmail = decoded.payload.email;
        } else if (req.cookies.Eshop) {
            token = req.cookies.Eshop;
            const decoded = jwt.decode(token, { complete: true });
            req.userEmail = decoded.payload.userId;
            console.log(req.userEmail);
        }

        try {
           
           
            next();
        } catch (error) {
            console.error("Error decoding JWT token:", error);
            res.status(500).json({ error: 'Error decoding JWT token' });
        }
    } else {
        res.status(500).json({ error: 'Your session expired' });
    }
}

module.exports = { Checkvalid };
