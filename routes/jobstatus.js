const express = require('express');
const router = express.Router();
const verifyJwt = require('../middlewares/jwt-verify');
const Job = require('../models/job');
const UserJob = require('../models/userjob')


router.get('/status', verifyJwt, async (req, res) => {

  id = req.user.id;
  //console.log(id)
  const data = await UserJob.findAll({
    where: {
      userid: id
    },
    include: Job
  });

  let values = [];

  for (let i = 0; i < data.length; i++) {
    values.push(data[i].dataValues)
  }

  //  console.log(values)

  return res.status(200).json(values)
})

module.exports = router;