//routes / userRoutes.js

const express = require('eapress');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController');

//register a new user
router.post('/register', registerUser);

//authen a user and get token
router.post('./login', authUser);

module.exports = router;