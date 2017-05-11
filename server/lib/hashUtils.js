let crypto = require('crypto');

module.exports.salt = crypto.randomBytes;
module.exports.hash = crypto.createHash;
