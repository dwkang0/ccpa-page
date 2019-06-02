const router = require('express').Router();

router.use('/', function(req, res){
  res.render('Login_page_test.html');
});

module.exports = router;
