const express = require('express');
const router = express.Router();
const verifyJwt = require('../middlewares/jwt-verify')

router.put('/reschedule', verifyJwt, reschedule)

module.exports = router;