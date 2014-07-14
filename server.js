var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var userStore = require('./modules/regard-user-store');
var auth = require('regard-authentication');

var Organization = require('./schemas/organization.js');
var Project = require('./schemas/project.js');
var Investigation = require('./schemas/investigation.js');

var emberController = require('./controllers/emberData.js');
var userController = require('./controllers/user.js');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

app.use(cors( {origin: true, credentials: true} ));
app.use(bodyParser());
app.use(auth(userStore));

var apiVersion = '/v1';
app.use(apiVersion, userController);
app.use(apiVersion, emberController(Organization));
app.use(apiVersion, emberController(Project));
app.use(apiVersion, emberController(Investigation));

// Routes
app.get('/', function (req, res) {
  res.send('Regard website api running');
});

app.listen(process.env.port);
console.log("Website api started on " + process.env.port);
