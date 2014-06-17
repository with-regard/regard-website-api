var express = require('express');
var DataStore = require('./regard-data-store.js');

var router = express.Router();
var dataStore = new DataStore('regard', 'website');

router.get('/userevents/:id', function (req, res, next) {
  var id = req.params.id;

  dataStore.getEventsForUser(id).then(function (events) {
    res.json({
      userevents: [{
        _id: id,
        events: JSON.parse(events)
      }]
    });
  }, next);
});

router.post('/userevents/:id/delete-data', function (req, res, next) {
  var id = req.params.id;

  dataStore.deleteData(id).then(function () {
    res.send(200);
  }, next);
});

module.exports = router;