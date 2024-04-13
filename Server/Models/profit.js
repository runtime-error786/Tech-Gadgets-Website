let {MYSQL} = require("./dbconfig");

const profit = `
CREATE TABLE IF NOT EXISTS profit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    price INT
)
`;


MYSQL.query(profit, (err, result) => {
    if (err) {
        console.error('Error creating users table:', err);
    } else {
        console.log('Profit table created successfully');
    }
});

