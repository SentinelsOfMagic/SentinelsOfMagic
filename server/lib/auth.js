const express = require('express');
const router = new express.Router();
const db = require('../../database/index.js');
const hashUtils = require('./hashUtils.js');

// - validates the signup form. The 'payload' parameter is given by the data passed in by the post
// request
// - returns an object that contains success (bool), message (string), and errors (object that
// contains error strings, which are displayed on the form)
var validateSignupForm = function(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.houseName !== 'string' || payload.houseName.trim().length === 0) {
    isFormValid = false;
    errors.houseName = 'Please provide a house name.';
    if (payload.houseName.trim().length > 64) {
      errors.houseName = 'House name cannot be greater than 64 characters.';
    }
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

// same as signup form
var validateLoginForm = function(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.houseName !== 'string' || payload.houseName.trim().length === 0) {
    isFormValid = false;
    errors.houseName = 'Please provide a house name.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  } else {

    // check if house name has already been taken
    var sql = 'SELECT * FROM houses WHERE housename = \'${houseName#}\'';
    db.query(sql, {houseName: req.body.houseName})
    .then((houseData) => {
      console.log('House data retrieved:', houseData);

      // if no house found in db, return error message
      if (houseData.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'House name already taken.'
        });
      }

      //generate salt and hash
      hashUtils.salt(32, (err, salt) => {
        if (err) {
          console.error(err);
          return;
        }
        var saltString = salt.toString('hex');
        var hashedPW = hashUtils.hash('sha256').update(req.body.password + saltString).digest('hex');

        // write to database
        var sql = 'INSERT INTO houses (housename, password, salt) VALUES ($1, $2, $3);';

        db.query(sql, [req.body.houseName, hashedPW, saltString])
        .then((data) => {
          console.log('House written to DB successfully:', data);
        })
        .catch((err) => {
          console.log('Cannot write house to DB:', err);
        });
      });

      // return res with a 'signup successful' message
      return res.status(200).json({
        success: true,
        message: 'Sign up successful! Please log in with your new account.'
      });

    })
    .catch((err) => {
      console.log('Error retrieving house data:', err);
    });
  }
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  } else {
    // get house, password, and salt from database using houseName
    var houseQuery = 'SELECT * FROM houses WHERE housename = ${houseName}';
    db.one(houseQuery, {houseName: req.body.houseName})
    .then((houseData) => {
      console.log('House data retrieved:', houseData);

      // use salt and password input to generate hash
      var inputHash = hashUtils.hash('sha256').update(req.body.password + houseData.salt).digest('hex');

      // compare new hash to hash in database
      if (inputHash === houseData.password) {
        console.log('Passwords match');

        // check if a user exists
        var userQuery = 'SELECT * FROM users WHERE house_id=${houseId#}';
        db.query(userQuery, {houseId: houseData.id})
        .then((usersData) => {
          console.log('Users retrieved:', usersData);

          // update session with houseId
          var currentSeshId = req.cookies.fridgrSesh.id;
          var sessionQuery = 'UPDATE sessions SET house_id = ${houseId#} WHERE id = ${sessionId#}';
          db.query(sessionQuery, {houseId: houseData.id, sessionId: currentSeshId})
          .then((sessionData) => {
            console.log('Session updated with houseId:', sessionData);

            // add houseId to cookie
            var currentCookie = req.cookies.fridgrSesh;
            currentCookie['houseId'] = houseData.id;
            let output = {userData: usersData, houseId: houseData.id};
            res.cookie('fridgrSesh', currentCookie);
            res.status(200).json(output);
          })
          .catch((err) => {
            console.log('Error updating session with houseId:', err);
          });
        })
        .catch((err) => {
          console.log('Error retrieving users:', err);
        });
      } else {
        console.log('Passwords do not match');
        // if no match, return error
        return res.status(401).json({
          success: false,
          message: 'Incorrect house name or password.'
        });
      }
    })
    .catch((err) => {
      console.log('Error retrieving house data:', err);

      // if no house found in db, return error message
      if (err.code === 0) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect house name or password.'
        });
      }
    });
  }
});

router.post('/logout', (req, res, next) => {
  var currentSeshId = req.cookies.fridgrSesh.id;

  // clear out houseId and userId from cookie
  var currentCookie = req.cookies.fridgrSesh;
  delete currentCookie['houseId'];
  delete currentCookie['userId'];
  res.cookie('fridgrSesh', currentCookie);
  console.log('Credentials cleared from cookie');

  // clear out houseId and userId from session
  var sessionQuery = 'UPDATE sessions SET house_id = NULL, user_id = NULL WHERE id = ${sessionId#}';
  db.query(sessionQuery, {sessionId: currentSeshId})
  .then((sessionData) => {
    console.log('Credentials removed from session:', sessionData);

    return res.status(200).json({
      success: true,
      message: 'Logout successful!'
    });
  })
  .catch((err) => {
    console.log('Error occurred while clearing credentials from session:', err);
  });
});

module.exports = router;
