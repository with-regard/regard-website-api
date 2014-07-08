var express = require('express');
var User = require('../schemas/userSchema.js');
var organizationController = require('./organizationController.js');

var app = express();

app.get('/users', function (req, res, next) {
  if (req.isAuthenticated()) {
    var user = req.user;

    organizationController.getOrganziationsForUser(user._id).then(function(organizations){
      if(organizations.length === 0) {
        organizations = [user._id];
      }

      user.organizations = organizations;

      res.json({
        "users": [user]
      });
    });

  } else {
    res.json({
      "users": [{
        _id: "anonymous user",
        isAnonymous: true,
        projects: ["53997a47b12b52200c7e3b88"]
      }]
    });
  }
});

module.exports = app;
