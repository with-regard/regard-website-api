var Organization = require('../schemas/organization.js');

module.exports = {
  getOrganziationsForUser: function getOrganziationsForUser(userId) {
    return Organization.find({ 'users': { $in: [userId.toString()] }}).exec();
  }
};
