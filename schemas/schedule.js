const scheduleSchema = {
    type: 'object',
    properties: {
        script: {
            type: 'string'
        },
        startTime: {
            type: 'string',
            pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
        },
        executeAgainAfter: {
            type: 'string',
            pattern: '^(\\d+s)?(\\d+m)?(\\d+h)?$'
        },
        times: {
            type: 'integer',
            minimum: 1
        },
    },
    required: ['script', 'startTime', 'executeAgainAfter', 'times'],
    additionalProperties: false,
};

module.exports = scheduleSchema;