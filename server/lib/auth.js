const express = require('express');
const router = new express.Router();

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
    return res.status(200).end();
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
    return res.status(200).end();
  }
});

module.exports = router;
