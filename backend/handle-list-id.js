
const { queryDb } = require('./database');
const model = require('./model');

const idIsValid = (req, res) => {
    const { id } = req.params;
    if (model.idFormat.test(id)) {
        return true
    } else {
        res.status(400).send({
            code: '400',
            message: 'invalid id (must be a uuid)'
        });
        return false
    }
};

const idExists = (req, res) => {
    return true;
};

module.exports.getListId = async (req, res) => {
    if (idIsValid(req, res) && idExists(req, res)) {
        const results = await queryDb('SELECT * FROM "todoapp"."items";');
        res.send(results);
    }
};

module.exports.deleteListId = (req, res) => {
    res.send('deleteListId')
};

module.exports.putListId = (req, res) => {
    res.send('putListId')
};