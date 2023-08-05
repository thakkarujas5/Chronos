const express = require('express');
const router = express.Router();
const schedule = require('../controllers/schedule')
const verifyJwt = require('../middlewares/jwt-verify') 

router.post('/schedule',verifyJwt, schedule)

module.exports = router;

