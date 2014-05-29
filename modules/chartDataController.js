var express = require('express');
var DataStore = require('./regard-data-store.js');
var Chart = require('../schemas/chart.js');

var router = express.Router();
var dataStore = new DataStore('Adobe', 'Brackets');

router.get('/chartdata', function (req, res, next) {
  var id = req.query.ids[0];

  dataStore.runQuery(id).then(function (result) {
    res.json({
      chartdata: [{
        _id: id,
        values: JSON.parse(result).Results
      }]
    });
  }, next);
});

router.put('/charts/:id', function (req, res, next) {
  if (!req.body.chart.queryDefinition) {
    res.send(400, 'missing query definition');
  }
  
  var queryName = req.params.id;
  var queryDefinition = req.body.chart.queryDefinition;

  dataStore.registerQuery(queryName, queryDefinition).done(function () {
    next();
  }, next);
});

module.exports = router;