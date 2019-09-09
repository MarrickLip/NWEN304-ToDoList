const router = require('express').Router();

const {postList} = require("./handle-list");
const {getList} = require("./handle-list");

router.get('/api', (req, res) => res.send('Yay!!'));

router.get('/api/list', getList);
router.post('/api/list', postList);

module.exports = router;