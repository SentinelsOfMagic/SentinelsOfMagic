let session = require('../../database/models/session');

let authPageRequest = (req, res, next) => {
  session.getSession(req.cookies.fridgrSesh.id)
  .then((session) => {
    if (session.hash === req.cookies.fridgrSesh.hash &&
        session.houseId === req.cookies.fridgrSesh.houseId &&
        session.userId === req.cookies.fridgrSesh.userId) {
      next();
    } else {
      res.clearCookie('fridgrSesh');
      res.redirect(401, '/login');
    }
  });

};

let authAPICall = (req, res, next) => {
  session.getSession(req.cookies.fridgrSesh.id)
  .then((session) => {
    if (session.hash === req.cookies.fridgrSesh.hash &&
        session.houseId === req.cookies.fridgrSesh.houseId &&
        session.userId === req.cookies.fridgrSesh.userId) {
      next();
    } else {
      res.clearCookie('fridgrSesh');
      res.send({error: 'unauthorized'});
    }
  });

};

module.exports.pageRequest = authPageRequest;
module.exports.APICall = authAPICall;
