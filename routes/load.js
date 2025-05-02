const express = require('express');
const router = express.Router();

// Route to serve the load page
router.get('/', (req, res) => {
    const data = req.query.abcd; // Get the query parameter
    if (data === undefined) {
        res.render('error', { message: 'No data provided' });
    } else {
        res.render('load', { data }); // Render the load view with data
    }
});

// Export the router
module.exports = router;