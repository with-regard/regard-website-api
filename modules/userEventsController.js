var express = require('express');
var DataStore = require('./regard-data-store.js');

var router = express.Router();

router.get('/userevents/:organization/:product/:id', function (req, res, next) {
  var id = req.params.id;
  var dataStore = new DataStore(req.params.organization, req.params.product);

  dataStore.getEventsForUser(id).then(function (events) {
    res.json({
      "user-events": [{
        _id: id,
        events: JSON.parse(events)
      }]
    });
  }, next);
});

router.post('/userevents/:organization/:product/:id/delete-data', function (req, res, next) {
  var id = req.params.id;
  var dataStore = new DataStore(req.params.organization, req.params.product);

  dataStore.deleteData(id).then(function () {
    res.send(200);
  }, next);
});

module.exports = router;
