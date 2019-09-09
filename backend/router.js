const express = require('express');

const handleList = require("./handle-list");
const handleListId =  require("./handle-list-id");

const router = express.Router();
router.use(express.json());

router.get('/api/list', handleList.getList);
router.post('/api/list', handleList.postList);

router.get('/api/list/:id', handleListId.getListId);
router.delete('/api/list/:id', handleListId.deleteListId);
router.put('/api/list/:id', handleListId.putListId);

module.exports = router;