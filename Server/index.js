const express = require('express');
const app = express();
const Signin = require('./Routes/Signin');
const port = 2001;

app.use('/signin', Signin);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
