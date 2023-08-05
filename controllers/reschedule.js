const Job = require('../models/job')
const express = require('express');

async function reschedule (req,res) {

    const jobid = req.body.id;

    const jobupdate = await Job.update(
        {
            status: 'rescheduled',
            startTime: req.body.startTime,
            executeAgainAfter: req.body.executeAgainAfter,
            timesLeft: req.body.times,

        },
        {
            where: {
                id: jobid
            }
        }
    )

    return res.status(200).json({
        message: "Job rescheduled successfully"
    })


}