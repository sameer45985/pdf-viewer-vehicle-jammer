const express = require('express');
const path = require('path');
const createError = require('http-errors'); // Import createError
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const db = require('./db'); // Assuming the database functions are correctly defined in db.js
const fs = require('fs');
const app = express();


// Import route modules
const indexRouter = require('./routes/index');
const loadRouter = require('./routes/load');
const loginRouter = require('./routes/login'); // Ensure this is correct
const submitRouter = require('./routes/submit');
const tableRouter = require('./routes/table');
const dataRouter = require('./routes/data');

// Middleware to parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory for the views
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the imported routers
app.use('/', indexRouter);
app.use('/load', loadRouter);
app.use('/login', loginRouter); // Ensure this is correct
app.use('/submit', submitRouter);
app.use('/data', dataRouter);
app.use('/table', tableRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for testing or further use
module.exports = app; // This is correct
