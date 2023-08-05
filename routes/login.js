const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const loginUser = require('../controllers/login')

router.post('/login', loginUser)

module.exports = router;