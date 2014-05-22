var express = require('express');
var DataStore = require('./regard-data-store.js');
var Chart = require('../schemas/chart.js');

var router = express.Router();
var dataStore = new DataStore('adobe', 'brackets');

router.get('/chartdata', function (req, res, next) {
  var id = req.query.ids[0];
  console.log(id);
  dataStore.runQuery(id).then(function (result) {
    console.dir(result);
    res.json({
      chartdata: [{
        _id: id,
        values: JSON.parse(result).Results
      }]
    });
  });
});

module.exports = router;