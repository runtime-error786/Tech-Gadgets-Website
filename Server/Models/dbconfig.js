const mysql = require('mysql');

const MYSQL = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'eshop'
});

MYSQL.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = {MYSQL};