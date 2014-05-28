var express = require('express');
var User = require('../schemas/userSchema.js');

var app = express();

app.get('/users', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.json({
      "users": [req.user]
    });
  } else {
    res.json({
      "users": [{
        _id: "anonymous user"
      }]
    })
  }
});

app.put('/users/:id', function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.send(401, 'You must be logged in to join a project');
  }

  User.findById(req.params.id).exec().then(function (user) {
    user.projects = req.body.user.projects;
    user.save();

    res.json({
      "user": user
    });
  }, next);
});

module.exports = app;