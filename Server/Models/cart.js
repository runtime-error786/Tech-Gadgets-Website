let {MYSQL} = require("./dbconfig");

const cart = `
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255),
    product_id INT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
)
`;


MYSQL.query(cart, (err, result) => {
    if (err) {
        console.error('Error creating users table:', err);
    } else {
        console.log('cart table created successfully');
    }
});

