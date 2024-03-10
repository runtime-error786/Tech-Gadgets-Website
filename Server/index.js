const express = require('express');
const signup = require('./Routes/Signup');
let signin = require("./Routes/Signin");
let signingoogle = require("./Routes/Signingoogle");
let Auth = require("./Routes/Auth");
let out = require("./Routes/Signout");
let addadmin = require("./Routes/Addadmin");

const cors = require('cors'); 
const cookieParser = require('cookie-parser');

const port = 2001;
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use('/signup', signup);
app.use('/signin', signin);
app.use("/signingoogle",signingoogle);
app.use("/auth",Auth);
app.use("/signout",out);
app.use("/addadmin",addadmin);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
