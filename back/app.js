const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const emailRoute = require('./routes/email');
const app = express();

// backend is setup on port 3000 or PORT stated in environment variables
const PORT = process.env.BACKEND_PORT || 3000;
const FRONTEND_PORT = process.env.FRONTEND_ORIGIN || 'http://localhost:8000';
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});

// Configure CORS to allow requests from http://localhost:8000 (our frontEnd application)
app.use(cors({
  origin: FRONTEND_PORT
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Specific path can be found in routes file
// Route for authentication(account)-related functionality(inc. login, registration, delete and recover account)
app.use('/', authRoute);

// Route for user-related functionality
app.use('/users', usersRoute);

// Route for sending emails (Postmark API)
app.use('/send', emailRoute);



// catch 404 and forward to error handler
app.use(function (request, response) {
  response.status(404).send({message: 'NOT FOUND'});
});

module.exports = app;
