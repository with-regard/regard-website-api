var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  githubId: Number,
  name: String,
  avatar_url: String,
  projects: Array,
  userId: String, 
  isUser: Boolean,
  isDeveloper: Boolean
});

module.exports = mongoose.model('User', userSchema);