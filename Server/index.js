const express = require('express');
const signup = require('./Routes/Signup');
let signin = require("./Routes/Signin");
const cors = require('cors'); 
const cookieParser = require('cookie-parser');

const port = 2001;
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use('/signup', signup);
app.use('/signin', signin);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
