const uuid = require('uuid/v1');

const db = require('./database');
const validateItem = require('./model').validateItem;

const itemIsValid = (req, res) => {
    if (validateItem(req.body)) {
        return true
    } else {
        res.status(400).send({
            code: 400,
            message: 'todo item is not valid'
        });
        return false
    }
};

module.exports.getList = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM todoapp.items');
        res.send(response.rows);
    } catch (e) {
        res.sendStatus(500);
    }
};

module.exports.postList = async (req, res) => {
    if (itemIsValid(req, res)) {
        const id = uuid();
        await db.query(`INSERT INTO todoapp.items VALUES ('${id}', '${req.body.title}', ${req.body.completed})`); // no SQL injection protection!
        res.set('Location', `${req.hostname}/api/list/${id}`);
        res.status(201).send({
            code: 201,
            message: 'success',
        })
    }
};