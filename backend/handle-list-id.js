
const db = require('./database');
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

const idExists = async (req, res) => {
    const { rows } = await db.query(`SELECT COUNT(*) FROM todoapp.items WHERE id='${req.params.id}';`);
    if (rows[0].count === '1') {
        return true
    } else {
        res.status(404).send({
            code: 404,
            message: 'todo item not found'
        })
    }
};

module.exports.getListId = async (req, res) => {
    if (idIsValid(req, res) && await idExists(req, res)) {
        const { rows } = await db.query(`SELECT * FROM todoapp.items WHERE id='${req.params.id}';`);
        res.send(rows[0]);
    }
};

module.exports.deleteListId = (req, res) => {
    res.send('deleteListId')
};

module.exports.putListId = (req, res) => {
    res.send('putListId')
};