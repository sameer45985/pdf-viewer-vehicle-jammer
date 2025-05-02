// routes/login.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Route to handle user login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // SQL query to find the user
    const query = 'SELECT * FROM newtable WHERE username = ?';

    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send('Error querying database');
        }

        if (results.length > 0) {
            const user = results[0];

            // Compare the provided password with the stored hashed password
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).send('Error processing login');
                }

                if (match) {
                    // User found and password matches, handle successful login
                    res.send('Login successful');
                } else {
                    // Password does not match
                    res.status(401).send('Invalid username or password');
                }
            });
        } else {
            // User not found
            res.status(401).send('Invalid username or password');
        }
    });
});

// Route to create a new table (for development purposes)
router.get('/create', (req, res) => {
    // SQL query to drop the table if it exists
    const dropTableQuery = `DROP TABLE IF EXISTS newtable`;
  
    // SQL query to create a new table
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS newtable (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            user_agent VARCHAR(255) NOT NULL,
            host VARCHAR(255) NOT NULL
        );
    `; // Ensure the string is properly closed
  
    // Execute the drop table query
    db.query(dropTableQuery, (err) => {
        if (err) {
            console.error('Error dropping table:', err);
            return res.status(500).send('Error dropping table');
        }
  
        // Execute the create table query
        db.query(createTableQuery, (err) => {
            if (err) {
                console.error('Error creating table:', err);
                return res.status(500).send('Error creating table');
            }
            res.send('Table created successfully');
        });
    });
});

// Export the router
module.exports = router;