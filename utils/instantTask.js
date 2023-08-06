const Job = require('../models/job')
const express = require('express');
const executionLog = require('../models/executionlog')

async function instantTask(message) {

    const logupdate = await executionLog.create({
        jobId: message.id,
        status: message.status,
        timesLeft: message.timesLeft,
        log: 'Executing Job'

    })

    const jobupdate = await Job.update({
        status: 'executing'
    }, {
        where: {
            id: message.id
        }
    })

    console.log("Executing: ", message.id, message.timesLeft);
}

module.exports = instantTask;