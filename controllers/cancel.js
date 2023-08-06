const Job = require('../models/job')
const express = require('express');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true }); 
const cancelSchema = require('../schemas/cancel')
const validateCancel = ajv.compile(cancelSchema)
const UserJob = require('../models/userjob')

async function cancel(req, res) {


    const valid = validateCancel(req.body);

    if (!valid) {
        const errors = validateCancel.errors.map((error) => {
            return {
                field: error.dataPath,
                message: error.message
            };
        });
        return res.status(400).json({
            errors
        });
    }

    const id = req.user.id;

    const job = await UserJob.findAll({
        where: {
            jobid: req.body.id
        }
    })
    if(id != job[0].dataValues.userid)
    {
        return res.status(500).json({
            message:"You are not authorized to perform this action."
        })
    }
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