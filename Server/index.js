const express = require('express');
const signup = require('./Routes/Signup');
let signin = require("./Routes/Signin");
let signingoogle = require("./Routes/Signingoogle");
let Auth = require("./Routes/Auth");
let out = require("./Routes/Signout");
let addadmin = require("./Routes/Addadmin");
let Addproduct = require("./Routes/Addproduct");
let Show = require("./Routes/ShowAdmin");
let DelAdmin = require("./Routes/DelAdmin");
let signinforgot = require("./Routes/Signinforgot");

const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const Delprod = require('./Routes/Delproduct');
const Showprod = require('./Routes/Showprod');

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
app.use("/addproduct",Addproduct);
app.use("/showadmin",Show);
app.use("/DelAdmin",DelAdmin);
app.use("/signinForgot",signinforgot);
app.use("/Delprod",Delprod);
app.use("/ShowProd",Showprod);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
