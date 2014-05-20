var express = require('express');
var DataStore = require('./regard-data-store.js');
var promise = require('promise');

module.exports = function(emberCrudController) {
  var router = express.Router();
  var dataStore = new DataStore('adobe', 'brackets');
  
  router.use(function(req, res, next) {
    var originalJson = res.json;
    
    res.json = function(mongooseResultSet) {
      res.json = originalJson;
      
      var chartString = JSON.stringify(mongooseResultSet);
      
      var chartObject = JSON.parse(chartString);
      
      var promises = promise.all(chartObject.charts.map(function(chart) {
          return dataStore.runQuery('Adobe%20Brackets%20Extension').then(function (result) {
            var chartData = JSON.parse(result).Results.map(function(chartElement) {
              return {
                name: chartElement['Extension'],
                value: chartElement['EventCount']
              }
            });
            
            chart['chartData'] = chartData
            
            return chart;
        });
      })).then(function(hydratedCharts) {
        res.json({
          charts: hydratedCharts
        });
      }, function(err) {
        console.log(error);
      });
    }
    
    emberCrudController(req, res, function(error) {
      res.json = originalJson;
      next(error);
    });
  });

  return router;
};