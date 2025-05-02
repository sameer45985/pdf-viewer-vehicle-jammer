// routes/data.js
const express = require('express');
const router = express.Router(); // Correctly call express.Router() as a function
const db = require('../db'); // Assuming you have a database connection in db.js

// Route to get data
router.get("/", (req, res) => {
    const selectQuery = 'SELECT id, username, password, user_agent, host FROM newtable';
    db.query(selectQuery, (err, results) => {
        if (err) {
            console.error("Error executing query:", err); // Log the error
            return res.status(500).send("Error retrieving data");
        }
        res.render("table", { data: results }); // Render table.ejs with the fetched data
    });
});

// Route to delete data
router.get('/delete', (req, res) => {
    const query = `DROP TABLE newtable`;

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Error Deleting Data');
        } else {
            res.send('Table deleted successfully');
        }
    });
});

// Export the router
module.exports = router;