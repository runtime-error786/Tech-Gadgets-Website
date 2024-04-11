let {MYSQL} = require("./dbconfig");

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
        console.log('token table created successfully');
    }
});