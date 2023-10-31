const express = require('express');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const emailRoute = require('./routes/email');
const app = express();


app.listen(3000);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', authRoute);
app.use('/users', usersRoute);
app.use('/send', emailRoute);



// catch 404 and forward to error handler
app.use(function (request, response) {
  response.status(404).send({message: "NOT FOUND"});
});

module.exports = app;
