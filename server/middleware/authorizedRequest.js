let session = require('../../database/models/session');

let isAuthorizedForRoute = (req, res, next) => {
  session.getSession(req.cookies.session.id)
  .then((session) => {
    if (session.hash === req.cookies.session.hash &&
        session.houseId === req.cookies.session.houseId &&
        session.userId === req.cookies.session.userId) {
      next();
    } else {
      res.clearCookie('session');
      res.redirect(401, '/login');
    }
  });

};

module.exports = isAuthorizedForRoute;
