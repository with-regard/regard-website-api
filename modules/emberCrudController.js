var express = require('express');

module.exports = function (Schema) {
  var router = express.Router();
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

  function mustBeLoggedInToMakeChanges(req, res, next) {
    if (!req.isAuthenticated()) {
      res.send(401, 'You must be logged in to make changes');
    } else {
      next();
    }
  }
  
  function disable(req, res, next) {
    res.send(401);
  }

  router.put('*', disable);
  router.post('*', disable);
  router.delete('*', disable);

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
    Schema.findByIdAndRemove(req.params.id).exec().then(function () {
      res.send(200);
    }, next);
  });

  return router;
};