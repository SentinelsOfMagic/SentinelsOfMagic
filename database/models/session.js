let pg = require('pg-promise');
let db = require('../index.js');

let getSession = (sessionId) => {
  return db.one(`SELECT * FROM sessions WHERE id=$1`, [sessionId])
    .catch(err => {
      console.log(err);
      return err;
    });
};

module.exports.getSession = getSession;
