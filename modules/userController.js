var express = require('express');
var User = require('../schemas/userSchema.js');

var app = express();

app.get('/users', function (req, res, next) {
  res.json({
    "users": [{
      _id: "09f51f26-8211-4046-9295-cae7b7753371",
      projects: ["537e0639444552182b524d45"],
      isDeveloper: false
    }]
  });
});

app.put('/users/:id', function (req, res, next) {
  throw new Error('user cannot modify projects');
  
  User.findById(req.params.id).exec().then(function (user) {
    user.projects = req.body.user.projects;
    user.save();

    res.json({
      "user": user
    });
  }, next);
});

module.exports = app;