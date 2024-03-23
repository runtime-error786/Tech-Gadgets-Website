const express = require('express');
const signup = require('./Routes/Signup');
let signin = require("./Routes/Signin");
let signingoogle = require("./Routes/Signingoogle");
let out = require("./Routes/Signout");
let addadmin = require("./Routes/Addadmin");
let Addproduct = require("./Routes/Addproduct");
let Show = require("./Routes/ShowAdmin");
let DelAdmin = require("./Routes/DelAdmin");
let signinforgot = require("./Routes/Signinforgot");
const path = require('path');
let Pinauth = require("./Routes/PinAuth");
let Auth = require("./Routes/Auth");

const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const Delprod = require('./Routes/Delproduct');
const Showprod = require('./Routes/Showprod');
const UpdateProduct = require('./Routes/Updateproduct');
const AdminCount = require('./Routes/Admincount');
const CustomerCount = require('./Routes/Customercount');
const CustomerCountByCountry = require('./Routes/Piechart');
const CategoryProductQtySum = require('./Routes/Barchart');
const ShowAdmin = require('./Routes/Showprofile');
const UpAdmin = require('./Routes/Updateprofile');
const ShowprodCus = require('./Routes/DisplayProductCus');
const AddToCart = require('./Routes/add_to_cart');

const port = 2001;
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use("/Updateprod",UpdateProduct);
app.use("/admincount",AdminCount);
app.use("/customercount",CustomerCount);
app.use("/CustomerCountByCountry",CustomerCountByCountry);
app.use("/CategoryProductQtySum",CategoryProductQtySum);
app.use("/Showprofile",ShowAdmin);
app.use("/upprofile",UpAdmin);
app.use("/pinauth",Pinauth);
app.use("/ShowProdCus",ShowprodCus);
app.use("/addtocart",AddToCart);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
