var express = require('express');
var mongoose = require('mongoose');

var regardUserStore = require('./modules/regard-user-store');
var auth = require('regard-authentication')(regardUserStore);

var projectController = require('./modules/projectController.js');
var investigationController = require('./modules/investigationController.js');
var userController = require('./modules/userController.js');
var errorHandler = require('./modules/errorHandler.js');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

app.use(auth);

var apiVersion = '/v1';
app.use(apiVersion, projectController);
app.use(apiVersion, investigationController);
app.use(apiVersion, userController);

// Routes
app.get('/', function (req, res) {
  res.send('Regard website api running');
});

app.use(errorHandler);

var port = process.env.port || 3001;

app.listen(port);
console.log("Website api started on " + port);