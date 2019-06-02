const router = require('express').Router();
const Data = require(__base+'/data');

router.post('/register', require('./register'));
router.post('/login', require('./login'));
router.get('/info', Data.token.auth(require('./info.js')).router);

module.exports = router;
