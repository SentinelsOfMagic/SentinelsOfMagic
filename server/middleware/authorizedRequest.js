let session = require('../../database/models/session');

let isAuthorizedForRoute = (req, res, next) => {
  session.getSession(req.cookie.id)
  .then((session) => {
    console.log(session);
  });

};

module.exports = isAuthorizedForRoute;
