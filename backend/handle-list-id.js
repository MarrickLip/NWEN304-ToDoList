
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

module.exports.deleteListId = async (req, res) => {
    if (idIsValid(req, res) && await idExists(req, res)) {
        await db.query(`DELETE FROM todoapp.items WHERE id='${req.params.id}';`);
        res.status(200).send({
            code: 200,
            message: 'success'
        })
    }
};

module.exports.putListId = async (req, res) => {
    const item = req.body;
    if (idIsValid(req, res) && await idExists(req, res)) {
        if (model.validateItem(item)) {
            await db.query(`UPDATE todoapp.items SET title='${item.title}', completed='${item.completed}' WHERE id = '${req.params.id}';`);
            res.status(200).send({
                code: 200,
                message: 'success'
            })
        } else {
            res.status(400).send({
                code: 400,
                message: 'todo item is not valid'
            })
        }
    }
};