const Job = require('../models/job')
const express = require('express');
const getMillisecondsDifference = require('../utils/getMilliSecond')
const timeInMilliseconds = require('../utils/timeInMilli')
const parseMilliseconds = require('../utils/parseMilli')
const addJobwithDelay = require('../utils/addJobWithDelay');
const UserJob = require('../models/userjob');
const executionLog = require('../models/executionlog')

const channel = "my_sorted_set";

async function schedule(req, res) {

   // console.log(req.body);
    const {
        script,
        startTime,
        executeAgainAfter,
        times
    } = req.body;

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
        //   console.log(del/1000);

        const logupdate = await executionLog.create({
            jobId: data.dataValues.id,
            status: data.dataValues.status,
            timesLeft: data.dataValues.timesLeft,
            log: 'Scheduled the job sucessfully'
        })

        addJobwithDelay(data.dataValues.id, channel, data.dataValues, 1);



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