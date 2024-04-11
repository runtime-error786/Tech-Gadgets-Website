let {MYSQL} = require("./dbconfig");

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
