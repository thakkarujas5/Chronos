const Job = require('../models/job')
const express = require('express');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true }); 
const cancelSchema = require('../schemas/cancel')
const validateCancel = ajv.compile(cancelSchema)

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