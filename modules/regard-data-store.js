var request = require('request');
var Promise = require('promise');

function makeRequest(url) {
  return new Promise(function (fulfill, reject) {
    request(url, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        reject(error);
      } else {
        fulfill(body);
      }
    });
  });
}

function getUrls(organizationId, productId) {
  function joinUrl() {
    var args = Array.prototype.slice.call(arguments);
    return args.join('/');
  }

  function endpointUrl() {
    return joinUrl('http://regard-consumer.cloudapp.net:8888/product/v1', organizationId, productId);
  }

  return {
    createProduct: function () {
      return joinUrl(endpointUrl(), 'create');
    },

    registerQuery: function () {
      return joinUrl(endpointUrl(), 'register-query');
    },

    runQuery: function (queryName) {
      return joinUrl(endpointUrl(), 'run-query', queryName);
    },

    optIn: function (userId) {
      return joinUrl(endpointUrl(), userId, 'opt-in');
    },

    optOut: function (userId) {
      return joinUrl(endpointUrl(), userId, 'opt-out');
    }
  };
}

module.exports = function (organizationId, productId) {
  var urls = getUrls(organizationId, productId);

  return {
    createProduct: function () {

    },

    registerQuery: function () {

    },

    runQuery: function (queryName) {
      var url = urls.runQuery(organizationId, productId, queryName);
      return makeRequest(url);
    },

    optIn: function (userId) {

    },

    optOut: function (userId) {

    }
  };
};