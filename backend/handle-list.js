const db = require('./database');

module.exports.getList = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM todoapp.items');
        res.send(response.rows);
    } catch (e) {
        res.sendStatus(500);
    }
    res.send('getList')
};

module.exports.postList = (req, res) => {
    res.send('postList');
};