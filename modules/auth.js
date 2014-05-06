'use strict';

var express = require('express');
var passport = require('passport');
var controller = require('./authController.js');

var app = express();

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  controller.fetchUserById(id).then(function (user) {
    done(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;