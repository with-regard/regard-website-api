"use strict";

var express = require('express');
var User = require('../schemas/user.js');
var organizationController = require('./organization.js');

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
        organizations: ["53c919a7e4b06ed9bccb4dea"]
      }]
    });
  }
});

module.exports = app;
