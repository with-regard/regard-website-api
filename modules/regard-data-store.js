var request = require('request');
var Promise = require('promise');

function makeRequest(url) {
  return new Promise(function (fulfill, reject) {
    request(url, function (error, response, body) {
      if (error || response.statusCode >= 400) {
        error = error || response.statusCode;
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

    runQueryWithUser: function (queryName, userId) {
      return joinUrl(endpointUrl(), 'run-query', queryName, userId);
    },

    optIn: function (userId) {
      return joinUrl(endpointUrl(), 'users', userId, 'opt-in');
    },

    optOut: function (userId) {
      return joinUrl(endpointUrl(), 'users', userId, 'opt-out');
    },
    
    deleteData: function(userId) {
      return joinUrl(endpointUrl(), 'users', userId, 'delete-data');
    },

    getEventsForUser: function (userId) {
      return joinUrl(endpointUrl(), 'get-events-for-user', userId);
    }
  };
}

module.exports = function (organizationId, productId) {
  var urls = getUrls(organizationId, productId);

  return {
    createProduct: function () {

    },

    registerQuery: function (name, definition) {
      var options = {
        url: urls.registerQuery(),
        json: {
          "query-name": name,
          "query-definition": JSON.parse(definition)
        },
        method: "post"
      };

      return makeRequest(options);
    },

    runQuery: function (queryName) {
      return makeRequest(urls.runQuery(queryName));
    },

    runQueryWithUser: function (queryName, userId) {
      return makeRequest(urls.runQuery(queryName, userId));
    },

    optIn: function (userId) {

    },

    optOut: function (userId) {

    },
    
    deleteData: function (userId) {
      var options = {
        url: urls.deleteData(userId),
        method: "post"
      };

      return makeRequest(options);
    },

    getEventsForUser: function (userId) {
      return makeRequest(urls.getEventsForUser(userId));
    }
  };
};