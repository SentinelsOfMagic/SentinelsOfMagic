let session = require('../../database/models/session');
let db = require('../../database/index.js');
let hashUtils = require('../lib/hashUtils.js');

let assignCookie = (req, res, next) => {
  if (req.cookies.fridgrSesh) {
    next();
  } else {
    hashUtils.salt(32, (err, hash) => {
      if (err) {
        console.error(err);
        return;
      }

      // create a new session entry with hash
      var hashString = hash.toString('hex');
      var sessionQuery = 'INSERT INTO sessions (hash) VALUES (${hashString}) RETURNING id';
      db.query(sessionQuery, {hashString: hashString})
      .then((sessionData) => {
        console.log('New session created:', sessionData);

        res.cookie('fridgrSesh', {id: sessionData[0].id, hash: hashString});
        next();
      })
      .catch((err) => {
        console.log('Error creating new session:', err);
      });
    });
  }
};

module.exports = assignCookie;
