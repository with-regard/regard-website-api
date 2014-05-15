var express = require('express');
var DataStore = require('./regard-data-store.js');

var router = express.Router();

router.get('/charts', function (req, res, next) {
  var dataStore = new DataStore('organizationId', 'productId');
  
  dataStore.runQuery('queryName').then(function (result) {
    res.json({
      "charts": result
    });
  });
});

module.exports = router;