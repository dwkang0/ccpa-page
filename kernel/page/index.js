const router = require('express').Router();

router.use('/', function(req, res){
  let url = req.url;
  if(url = '/'){
    url='/Main.html';
  }
  console.log('response: '+'./pages'+url);
  res.render('./pages'+url);
});

module.exports = router;
