const express = require('express');
const router = express.Router();
const verifyJwt = require('../middlewares/jwt-verify')
const reschedule = require('../controllers/reschedule')

router.put('/reschedule', verifyJwt, reschedule)

module.exports = router;