const User = require(__base+'/data').user;

/*
POST /api/auth/register
{
  username,
  password
}
*/

module.exports = (req, res) => {
  console.log('post /api/auth/register/');
  var result = { };

  if(!req.body['password'] || !req.body["name"] || !req.body["username"]){
    result['success']=0;
    result['error']='invalid request';
    if(req.body['password']){
      console.log("pass is right...");
    }
    if(req.body['name']){
      console.log("name is right...");
    }
    if(req.body['username']){
      console.log("username is right...");
    }
    res.json(result);
    return;
  }
  var username = req.body['username'];
  users = User.get();
  if(users[username]){
    result['success']=0;
    result['error']='duplicate';
    res.json(result);
    return;
  }
  User.create(username, req.body['name'], req.body['password']);
  result['sucess']=1;
  res.json(result);

}
