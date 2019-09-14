const express = require('express');

const handleList = require("./handle-list");
const handleListId =  require("./handle-list-id");

const mixins = require("./mixins");
const m = (handler) => mixins.errorHandling(mixins.cors(handler));

const router = express.Router();
router.use(express.json());

router.options('/api/*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Location');
    res.status(200);
    res.send();
});

router.get('/api/list', m(handleList.getList));
router.post('/api/list', m(handleList.postList));

router.get('/api/list/:id', m(handleListId.getListId));
router.delete('/api/list/:id', m(handleListId.deleteListId));
router.put('/api/list/:id', m(handleListId.putListId));

module.exports = router;