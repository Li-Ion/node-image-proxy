const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const indexRouter = require('./routes/index.route');
const complexRouter = require('./routes/complex.route');

const app = express();

app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use( morgan('dev') );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( express.static(path.join(__dirname, 'public')) );

app.use( '/complex', complexRouter );
app.use( '/', indexRouter );

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;