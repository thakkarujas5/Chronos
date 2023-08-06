const Job = require('../models/job')
const express = require('express');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true }); 
const rescheduleSchema = require('../schemas/reschedule')
const validateReschedule = ajv.compile(rescheduleSchema)
const parseMilliseconds = require('../utils/parseMilli')
const addJobwithDelay = require('../utils/addJobWithDelay')
const getMillisecondsDifference = require('../utils/getMilliSecond')

const channelR = "my_sorted_set";

async function reschedule (req,res) {

    const jobid = req.body.id;

    const valid = validateReschedule(req.body);

    if (!valid) {
        const errors = validateReschedule.errors.map((error) => {
            return {
                field: error.dataPath,
                message: error.message
            };
        });
        return res.status(400).json({
            errors
        });
    }

    const del = getMillisecondsDifference(req.body.startTime)
    const jobupdate = await Job.update(
        {
            status: 'started',
            startTime: req.body.startTime,
            executeAgainAfter: parseMilliseconds(req.body.executeAgainAfter),
            timesLeft: req.body.timesLeft,

        },
        {
            where: {
                id: jobid
            }
        }
    )

    const jobinfo = await Job.findByPk(jobid);
   
    addJobwithDelay(jobid, channelR, jobinfo.dataValues, 1);

    return res.status(200).json({
        message: "Job rescheduled successfully"
    })


}

module.exports = reschedule