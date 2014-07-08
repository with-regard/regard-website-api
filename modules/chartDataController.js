var express = require('express');
var DataStore = require('./regard-data-store.js');
var Investigation = require('../schemas/investigation.js');

var router = express.Router();

function getDataStore(org, prod) {
    if (!org) {
      throw new Error('missing organization');
    }
    if (!prod) {
      throw new Error('missing product');
    }

    return new DataStore(org, prod);
}

function getDataStoreFromInvestigation(id) {
    return Investigation.findById(id).exec().then(function (investigation) {
      return getDataStore(investigation.organization, investigation.product);
    });
}


router.get('/chartdata/:id', function (req, res, next) {
  var id = req.params.id;

  getDataStoreFromInvestigation(id).then(function (dataStore) {
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

  var dataStore = getDataStore(req.body.investigation.organization, req.body.investigation.product);

  dataStore.registerQuery(queryName, queryDefinition).done(function (response) {
      console.dir("register query: " + response);
      next();
    }, next);
});

module.exports = router;
