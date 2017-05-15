let session = require('../../database/models/session');

let authPageRequest = (req, res, next) => {
  console.log(req.cookies);
  session.getSession(req.cookies.fridgrSesh.id)
  .then((session) => {
    if (session.hash === req.cookies.fridgrSesh.hash &&
        session.house_id === req.cookies.fridgrSesh.houseId &&
        session.user_id === req.cookies.fridgrSesh.userId) {
      next();
    } else {
      res.clearCookie('fridgrSesh');
      res.clearCookie('houseId');
      res.clearCookie('userId');
      res.redirect(401, '/login');
    }
  });

};

let authAPICall = (req, res, next) => {

  session.getSession(req.cookies.fridgrSesh.id)
  .then((session) => {
    if (session.hash === req.cookies.fridgrSesh.hash &&
        session.house_id === req.cookies.fridgrSesh.houseId &&
        session.user_id === req.cookies.fridgrSesh.userId) {
      next();
    } else {
      res.clearCookie('fridgrSesh');
      res.clearCookie('houseId');
      res.clearCookie('userId');
      res.send({error: 'unauthorized'});
    }
  });

};

module.exports.pageRequest = authPageRequest;
module.exports.APICall = authAPICall;
