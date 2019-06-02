const jwt = require('jsonwebtoken');
const User = require(__base+'/data').user;

/*
POST /api/auth/register
{
  username,
  password
}
*/

module.exports = (req, res) => {
  const {username, password} = req.body;
  const secret = req.app.get('jwt-secret');

  var user = User.get()[username];
  if(!user){
    //console.log(req.body);

    throw new Error('login faild');
  }
  if(user['password'] != password){
    //console.log('bb');
    throw new Error('login faild');
  }

  var token = jwt.sign(
    {
      _id: username,
      username: user['name'],
    },
    secret,
    {
      expiresIn: '7d',
      issuer: 'ccpa-lesson.org',
      subject: 'userInfo'
    }
  );
  res.json({
    sucess: 1,
    token: token
  });
}
