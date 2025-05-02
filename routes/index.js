// routes/index.js
const express = require('express');
const router = express.Router();

// Route to serve the index page
router.get('/', (req, res) => {
    const data = req.query.qazwsxedc;
    if (data === undefined) {
      res.render('error', { message: 'No data provided' });
    } else {
      res.render('index', { data });
    }
  });

// Export the router
module.exports = router;