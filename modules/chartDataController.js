var express = require('express');
var DataStore = require('./regard-data-store.js');

var router = express.Router();
var dataStore = new DataStore('Adobe', 'Brackets');

router.get('/chartdata/:id', function (req, res, next) {
  var id = req.params.id;
  
  dataStore.runQuery(id).then(function (result) {
    res.json(JSON.parse(result).Results);
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

  if (!queryDefinition) {
    res.send(400, 'missing query definition');
  }

  if (!isJSON(queryDefinition)) {
    res.send(400, 'query definition is not valid JSON');
  }

  dataStore.registerQuery(queryName, queryDefinition).done(function (response) {
    console.dir("register query: " + response);
    next();
  }, next);
});

module.exports = router;