var express = require('express');
var router = express.Router();

module.exports = function (Schema) {
  var modelName = Schema.modelName.toLowerCase();
  var collectionName = Schema.collection.name.toLowerCase();

  function formatResult(data) {
    var result = {};
    result[modelName] = data;
    return result;
  }

  function formatResults(data) {
    var result = {};
    result[collectionName] = data;
    return result;
  }

  router.get('/' + collectionName + '/:id', function (req, res, next) {
    Schema.findById(req.params.id).exec().then(function (document) {
      if (!document) {
        res.send(404);
      } else {
        res.json(formatResult(document));
      }
    }, next);
  });

  router.get('/' + collectionName, function (req, res, next) {
    if (!req.query.ids) {
      res.send(400, 'You must specify a list of ids');
    }

    Schema.find({
      '_id': {
        $in: req.query.ids
      }
    }).exec().then(function (documents) {
      res.json(formatResults(documents));
    }, next);
  });

  router.put('/' + collectionName + '/:id', function (req, res, next) {
    Schema.findByIdAndUpdate(req.params.id, req.body[modelName]).exec().then(function (document) {
      res.json(formatResult(document));
    }, next);
  });

  router.post('/' + collectionName, function (req, res, next) {
    var document = new Schema(req.body[modelName]);

    Schema.create(document).then(function () {
      res.json(formatResult(document));
    }, next);
  });

  router.delete('/' + collectionName + '/:id', function (req, res, next) {
    Schema.findById(req.params.id).exec().then(function () {
      res.send(200);
    }, next);
  });

  return router;
};