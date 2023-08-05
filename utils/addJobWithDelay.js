const express = require('express')
const pub = require('../redis/pub')
const sub = require('../redis/sub')
const Job = require('../models/job')
const executionLog = require('../models/executionlog')

async function addJobwithDelay(id, channel, job, delayInSeconds) {

    pub.setex('key' + id, delayInSeconds, "test");

    const logupdate = await executionLog.create({
        jobId: id,
        status:job.status,
        timesLeft: job.timesLeft,
        log: 'Added job to Redis'
    })

}

module.exports = addJobwithDelay;