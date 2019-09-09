const validate = require('jsonschema').validate;

module.exports.idFormat = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

// n.b. this is for item **request**, so doesn't include id
const itemSchema = {
    type: 'object',
    required: ['title', 'completed'],
    properties: {
        title: {
            type: 'string',
        },
        completed: {
            type: 'boolean',
        }
    }
};

module.exports.validateItem = (item) => {
    return validate(item, itemSchema).valid;
};

