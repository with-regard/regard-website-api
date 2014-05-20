var express = require('express');
var DataStore = require('./regard-data-store.js');

var router = express.Router();
var dataStore = new DataStore('adobe', 'brackets');

router.use(function(req, res, next) {
  dataStore.runQuery('Adobe%20Brackets%20Extension').then(function (result) {
    var chartData = JSON.parse(result).Results.map(function(chartElement) {
      return {
        name: chartElement['Extension'],
        value: chartElement['EventCount']
      }
    });

    res.json({
      chartdata: [{
          _id: '978207A8-D325-4817-AD98-79379893CDBF',
          values: chartData
        }]
    });
  });  
});

module.exports = router;