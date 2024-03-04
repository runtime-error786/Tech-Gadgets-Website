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

const user = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    password VARCHAR(255) DEFAULT '',
    picturepath VARCHAR(255),
    wallet INT DEFAULT 0,
    role VARCHAR(255) DEFAULT 'Customer'
)

`;

MYSQL.query(user, (err, result) => {
    if (err) {
        console.error('Error creating users table:', err);
    } else {
        console.log('Users table created successfully');
    }
});

const token = `
CREATE TABLE IF NOT EXISTS tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
`;

MYSQL.query(token, (err, result) => {
    if (err) {
        console.error('Error creating users table:', err);
    } else {
        console.log('Users table created successfully');
    }
});



module.exports = {MYSQL};