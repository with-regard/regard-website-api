"use strict";

var express = require('express');
var Project = require('../schemas/project.js');

var app = express();

// Allow CORs
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/projects/:id', function (req, res, next) {
  Project.findById(req.params.id).exec().then(function (project) {
    res.json({
      "project": project
    });
  }, next);
});

app.get('/projects', function (req, res, next) {
  // filter by user

  Project.find().exec().then(function (projects) {
    res.json({
      "projects": projects
    });
  }, next);
});

app.put('/projects/:id', function (req, res, next) {
  Project.findById(req.params.id).exec().then(function (project) {
    project.name = req.body.name;

    project.save();
    
    res.json({
      "project": project
    });
  }, next);
});

app.post('/projects', function (req, res, next) {
  var project = new Project({
    name: req.body.project.name
  });

  project.create().exec().then(function () {
    res.json({
      "project": project
    });
  }, next);

  // add project_id to user
});

app.delete('/projects/:id', function (req, res, next) {
  Project.findById(req.params.id).exec().then(function (project) {
    project.remove().exec().then(function () {
      res.send('');
    }, next)
  }, next);

  // remove project_id from user
});

module.exports = app;