const Job = require('../models/job')
const express = require('express');
const executionLog = require('../models/executionlog')

async function taskExecutor(message) {

    const logupdate = await executionLog.create({
        jobId: message.id,
        status: message.status,
        timesLeft: message.timesLeft,
        log: 'Executing Job'

    })

    console.log("Executing: ", message.id, message.timesLeft);
}

module.exports = taskExecutor;