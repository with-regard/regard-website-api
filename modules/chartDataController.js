var express = require('express');
var DataStore = require('./regard-data-store.js');
var Investigation = require('../schemas/investigation.js');

var router = express.Router();

function getDataStore(id) {
  return Investigation.findById(id).exec().then(function (investigation) {
    if (!investigation.organization) {
      throw new Error('investigation is missing organization');
    }

    if (!investigation.product) {
      throw new Error('investigation is missing product');
    }

    return new DataStore(investigation.organization, investigation.product);
  });
}

router.get('/chartdata/:id', function (req, res, next) {
  var id = req.params.id;

  getDataStore(id).then(function (dataStore) {
    dataStore.runQuery(id).then(function (result) {
      res.json(JSON.parse(result).Results);
    }, next);
  }, next);
});

function isJSON(jsonString) {
  try {
    var o = JSON.parse(jsonString);

    if (o && typeof o === "object" && o !== null) {
      return true;
    }
  } catch (e) {}
  return false;
}

router.put('/investigations/:id', function (req, res, next) {
  var queryName = req.params.id;
  var queryDefinition = req.body.investigation.queryDefinition;

  getDataStore(queryName).then(function (dataStore) {
    dataStore.registerQuery(queryName, queryDefinition).done(function (response) {
      console.dir("register query: " + response);
      next();
    }, next);
  }, next);
});

module.exports = router;