var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var frontend = require('./routes/frontend');
var apis = require('./routes/apis');

var app = express();
var db = require('./db');

//For laptop
app.use(cors({origin: 'http://localhost'}));
//For phone
//app.use(cors({origin: '*'}));

//After changing backend
//Restart backend
//Open Task Manager
//End task for Node
//Open Git bash in Backend folder
//npm start


// For using If Else IfCond in HBS files
//var hbs = require('hbs');
//var hbsHelpers = require('./helpers/hbsHelpers')(hbs);

// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
	if (err) {
		console.log(err);
		console.log('Unable to connect to MySQL.');
		process.exit(1);
	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/apis', apis);
app.use('/', frontend);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
