const Job = require('../models/job')
const express = require('express');
const getMillisecondsDifference = require('../utils/getMilliSecond')
const timeInMilliseconds = require('../utils/timeInMilli')
const parseMilliseconds = require('../utils/parseMilli')
const addJobwithDelay = require('../utils/addJobWithDelay');
const UserJob = require('../models/userjob');
const executionLog = require('../models/executionlog')
const instantTask = require('../utils/instantTask')
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true }); 
const scheduleSchema = require('../schemas/schedule')
const validateSchedule = ajv.compile(scheduleSchema)

const channel = "my_sorted_set";

async function schedule(req, res) {

   // console.log(req.body);
    const {
        script,
        startTime,
        executeAgainAfter,
        times
    } = req.body;

    const valid = validateSchedule(req.body);

    if (!valid) {
        const errors = validateSchedule.errors.map((error) => {
            return {
                field: error.dataPath,
                message: error.message
            };
        });
        return res.status(400).json({
            errors
        });
    }

    const nexexec = timeInMilliseconds(startTime) + parseMilliseconds(executeAgainAfter);

    try {
        const data = await Job.create({
            script,
            startTime,
            timesLeft: times,
            executeAgainAfter: parseMilliseconds(executeAgainAfter),
            nextExecutionTime: nexexec
        });

        const userjobtable = await UserJob.create({
            userid: req.user.id,
            jobid: data.dataValues.id
        })

        const del = getMillisecondsDifference(startTime)


        const logupdate = await executionLog.create({
            jobId: data.dataValues.id,
            status: data.dataValues.status,
            timesLeft: data.dataValues.timesLeft,
            log: 'Scheduled the job sucessfully'
        })

        if(del === 0) {

            instantTask(data.dataValues)

            addJobwithDelay(data.dataValues.id, channel, data.dataValues, data.dataValues.executeAgainAfter / 1000)
        }
        else{

            addJobwithDelay(data.dataValues.id, channel, data.dataValues, del / 1000);
        }

        

        res.status(200).json({
            success: true,
            message: 'Job schduled successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed ti schedule the job'
        });
    }
}

module.exports = schedule