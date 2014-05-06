'use strict';

var User = require('../schemas/userSchema.js');

exports.fetchUserById = function (id) {
  return User.findById(id).exec();
};