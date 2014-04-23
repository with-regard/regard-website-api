"use strict";

var express = require('express');
var compress = require('compression')();
var errorHandler = require('errorhandler')({
  dumpExceptions: true,
  showStack: true
});
var api = require('./modules/api.js');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

// Configuration
app.use(compress);
app.use('/v1', api);
app.use(errorHandler);

// Allow CORs
app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Routes
app.get('/', function (req, res) {
  res.send('Regard website api running');
});

// Go
app.listen(process.env.port || 3001);
console.log("Regard website api running");