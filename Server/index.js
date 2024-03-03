const express = require('express');
const signup = require('./Routes/Signup');
const cors = require('cors'); 


const port = 2001;
const app = express();

app.use(cors());
app.use('/signup', signup);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
