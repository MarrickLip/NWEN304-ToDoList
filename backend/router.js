const router = require('express').Router();

router.get('/api', (req, res) => res.send('Yay!!'));

module.exports = router;