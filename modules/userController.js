"use strict";

var express = require('express');
var User = require('../schemas/userSchema.js');
var organizationController = require('./organizationController.js');

var app = express();

app.get('/users', function (req, res, next) {
  if (req.isAuthenticated()) {
    var user = JSON.parse(JSON.stringify(req.user));

    organizationController.getOrganziationsForUser(user._id).then(function(organizations) {
      user.organizations = organizations.map(function(organization) {
        return organization._id;
      });

      res.json({
        "users": [user]
      });
    });

  } else {
    res.json({
      "users": [{
        _id: "anonymous user",
        isAnonymous: true,
        projects: ["53997a47b12b52200c7e3b88"] // change this to regard organization id
      }]
    });
  }
});

module.exports = app;
