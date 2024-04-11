let {MYSQL} = require("./dbconfig");

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