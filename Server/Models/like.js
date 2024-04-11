let {MYSQL} = require("./dbconfig");

const Like = `
CREATE TABLE IF NOT EXISTS likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255),
    product_id INT,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
)
`;


MYSQL.query(Like, (err, result) => {
    if (err) {
        console.error('Error creating users table:', err);
    } else {
        console.log('like table created successfully');
    }
});
