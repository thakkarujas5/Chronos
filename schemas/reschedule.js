const rescheduleSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            minimum: 1
        },
        startTime: {
            type: 'string',
            pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
        },
        executeAgainAfter: {
            type: 'string',
            pattern: '^(\\d+s)?(\\d+m)?(\\d+h)?$'
        },
        timesLeft: {
            type: 'integer',
            minimum: 0
        },
    },
    required: ['id', 'startTime', 'executeAgainAfter', 'timesLeft'],
    additionalProperties: false,
};

module.exports = rescheduleSchema