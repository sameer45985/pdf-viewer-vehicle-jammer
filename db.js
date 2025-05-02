const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12776156',
  password: 'qINF6aSRJw',
  database: 'sql12776156',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Example query
pool.query('SELECT * FROM newtable', (err, results) => {
  if (err) {
    console.error('Query error:', err.message);
  } else {
    console.log(results);
  }
});

// Create table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS newtable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    user_agent VARCHAR(255) NOT NULL,
    host VARCHAR(255) NOT NULL
  );
`;

pool.query(createTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Table created or already exists');
  }
});

// Export pool for use in routes, controllers, etc.
module.exports = pool;
