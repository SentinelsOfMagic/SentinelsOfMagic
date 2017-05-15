let session = require('../../database/models/session');

let authPageRequest = (req, res, next) => {
<<<<<<< HEAD
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
=======
  session.getSession(req.cookies.fridgrSesh.id)
  .then((session) => {
    if (session.hash === req.cookies.fridgrSesh.hash &&
        session.houseId === req.cookies.fridgrSesh.houseId &&
        session.userId === req.cookies.fridgrSesh.userId) {
      next();
    } else {
      res.clearCookie('fridgrSesh');
>>>>>>> c6357f71e8e6cec97f9217579c5bee480388b807
      res.redirect(401, '/login');
    }
  });

};

let authAPICall = (req, res, next) => {
<<<<<<< HEAD
  console.log(req.cookies);
  session.getSession(req.cookies.fridgrSesh.id)
  .then((session) => {
    if (session.hash === req.cookies.fridgrSesh.hash &&
        session.house_id === req.cookies.fridgrSesh.houseId &&
        session.user_id === req.cookies.fridgrSesh.userId) {
      next();
    } else {
      console.log(session);
      console.log(req.cookies);
      res.clearCookie('fridgrSesh');
      res.clearCookie('houseId');
      res.clearCookie('userId');
=======
  session.getSession(req.cookies.fridgrSesh.id)
  .then((session) => {
    if (session.hash === req.cookies.fridgrSesh.hash &&
        session.houseId === req.cookies.fridgrSesh.houseId &&
        session.userId === req.cookies.fridgrSesh.userId) {
      next();
    } else {
      res.clearCookie('fridgrSesh');
>>>>>>> c6357f71e8e6cec97f9217579c5bee480388b807
      res.send({error: 'unauthorized'});
    }
  });

};

module.exports.pageRequest = authPageRequest;
module.exports.APICall = authAPICall;
