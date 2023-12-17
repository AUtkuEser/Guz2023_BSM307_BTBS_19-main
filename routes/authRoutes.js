const express = require('express');
const router = express.Router();


const loginController = require('../src/controllers/loginController.js');
const registerController = require('../src/controllers/registerController.js');


router.post(
  '/register',
  registerController.validateRegisterRequest,
  registerController.checkIfUserExists,
  registerController.createUser
);

router.post(
  
  '/login',
  loginController.validateLoginRequest,
  loginController.checkUserCredentials,
  loginController.loginUser
);





module.exports = router;
