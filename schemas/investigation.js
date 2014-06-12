var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var investigationSchema = new Schema({
  name: String,
  queryDefinition: String,
  xAxisLabel: String,
  yAxisLabel: String,
  chartdata: Array,
  organization: String,
  product: String
});

module.exports = mongoose.model('Investigation', investigationSchema);