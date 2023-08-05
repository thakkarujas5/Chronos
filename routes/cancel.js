const express = require('express');
const router = express.Router();
const cancel = require('../controllers/cancel')
const verifyJwt = require('../middlewares/jwt-verify')

router.put('/cancel',verifyJwt ,cancel)

module.exports = router;