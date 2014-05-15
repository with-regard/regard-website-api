var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var allowCors = require('./modules/allowCors.js');
var userStore = require('./modules/regard-user-store');
var auth = require('regard-authentication');

var Project = require('./schemas/project.js');
var Investigation = require('./schemas/investigation.js');

var emberController = require('./modules/emberCrudController.js');
var userController = require('./modules/userController.js');
var chartDataController = require('./modules/chartDataController.js');
var errorHandler = require('./modules/errorHandler.js');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

app.all("*", allowCors);
app.use(bodyParser());
app.use(auth(userStore));

var apiVersion = '/v1';
app.use(apiVersion, userController);
app.use(apiVersion, emberController(Project));
app.use(apiVersion, emberController(Investigation));
app.use(apiVersion, chartDataController);


// Routes
app.get('/', function (req, res) {
  res.send('Regard website api running');
});

app.use(errorHandler);

app.listen(process.env.port);
console.log("Website api started on " + process.env.port);