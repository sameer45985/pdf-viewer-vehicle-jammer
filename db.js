const mysql = require('mysql2');  // or use 'mysql2' for better performance

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',   // Change to your DB host if needed
    user: 'root',        // Default user (change if different)
    password: 'root',    // Default is empty for XAMPP/WAMP
    database: 'Nargis'   // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to MySQL database! ✅');

    // SQL query to create a new table
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS newtable (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            user_agent VARCHAR(255) NOT NULL,
            host VARCHAR(255) NOT NULL
        );
    `; // Ensure the SQL string is properly closed

    // Execute the query to create the table if it doesn't exist
    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        console.log('Table created or already exists');
    });
});

// Export database connection for use in other files
module.exports = db;