const Job = require('../models/job')
const express = require('express');

async function cancel(req, res) {

    const cancelledJob = Job.update({
        status: 'cancelled'
    }, {
        where: {
            id: req.body.id,
        }
    })

    return res.status(200).json({
        message: "Job cancelled successfully"
    })

}

module.exports = cancel;