var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chartSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Chart', chartSchema);