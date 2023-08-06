const loginSchema = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
        },
        password: {
            type: 'string',
            minLength: 1
        },
    },
    required: ['email', 'password'],
    additionalProperties: false, // To disallow additional properties not defined in the schema
};

module.exports = loginSchema;