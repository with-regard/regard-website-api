var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var organizationScheme = new Schema({
  name: String,
  users: Array,
  projects: Array,
});

module.exports = mongoose.model('Organization', organizationScheme);
