var express = require('express');
var mongoose = require('mongoose');

var allowCors = require('./modules/allowCors.js');
var userStore = require('./modules/regard-user-store');
var auth = require('regard-authentication');

var projectController = require('./modules/projectController.js');
var investigationController = require('./modules/investigationController.js');
var userController = require('./modules/userController.js');
var errorHandler = require('./modules/errorHandler.js');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

app.all("*", allowCors);
app.use(auth(userStore));

var apiVersion = '/v1';
app.use(apiVersion, projectController);
app.use(apiVersion, investigationController);
app.use(apiVersion, userController);

// Routes
app.get('/', function (req, res) {
  res.send('Regard website api running');
});

app.use(errorHandler);

app.listen(process.env.port);
console.log("Website api started on " + process.env.port);