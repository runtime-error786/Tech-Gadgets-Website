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
    role VARCHAR(255) DEFAULT 'Customer',
    INDEX email_index (email)
);

`;

MYSQL.query(user, (err, result) => {
    if (err) {
        console.error('Error creating users table:', err);
    } else {
        console.log('Users table created successfully');
    }
});


const Product = `
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    category VARCHAR(255) NOT NULL,
    imagepath VARCHAR(255),
    UNIQUE KEY (id)
);
`;

MYSQL.query(Product, (err, result) => {
    if (err) {
        console.error('Error creating users table:', err);
    } else {
        console.log('product table created successfully');
    }
});

const token = `
CREATE TABLE IF NOT EXISTS tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
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