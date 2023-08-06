const registerSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 1
        },
        email: {
            type: 'string',
            pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
        },
        password: {
            type: 'string',
            minLength: 8
        },
    },
    required: ['name', 'email', 'password'],
    additionalProperties: false, // To disallow additional properties not defined in the schema
};

module.exports = registerSchema;