module.exports = function(app, fs)
{

  app.get('/', function(req, res){
    res.render('index', {
      title: "myHOMEPAGE",
      length: 5
    });
  });

  app.get('/list', function(req, res){
    fs.readFile(__dirname+"/../data/"+"user.json", 'utf8', function(err, data){
      console.log(data);
      res.end(data);
    });
  });

  app.get('/getUser/:username', function(req, res){
    fs.readFile(__dirname+"/../data/user.json", 'utf8', function(err, data){
      var users = JSON.parse(data);
      res.json(users[req.params.username])
    });
  });

  app.post('/addUser/:username', function(req, res){
    console.log('post /addUser/:username');
    var result = { };
    var username = req.params.username;

    if(!req.body['password'] || !req.body["name"]){
      result['success']=0;
      result['error']='invalid request';
      if(req.body['password']){
        console.log("pass is right...");
      }
      if(req.body['name']){
        console.log("name is right...");
      }
      res.json(result);
      return;
    }

    fs.readFile(__dirname+"/../data/user.json", 'utf8', function(err, data){
      var users = JSON.parse(data);
      if(users[username]){
        result['success']=0;
        result['error']='duplicate';
        res.json(result);
        return;
      }

      users[username] = req.body;

      fs.writeFile(__dirname+"/../data/user.json",
      JSON.stringify(users, null, '\t'), "utf8", function(err, data){
        result={'success' : 1};
        res.json(result);
        //console.log('the end');
      });
    });
    //console.log('func end');
  });

}
