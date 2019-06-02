const jwt = require('jsonwebtoken');
var config = require('./../config.js');

exports.getUserFromToken = (token) => {
  try {
    var decoded = jwt.verify(token, config.secret);
  } catch (e) {
    console.log(e);
    return -1;
  }
  return decoded;
}

function _tokenAuthErr(req, res) {
  var errorMessage = {
    none: 'Untransferred Authentication token',
    wrong: 'Wrong authentication token.'
  }
  return res.status(403).json({
    success: false,
    message: errorMessage[req.tokenStatus]
  });
}

function _tokenAuth(next, err = _tokenAuthErr) {
  this.next = next;
  this.router = (req, res) => {
    //console.log(req.headers);
    const token = req.headers['x-access-token'];
    console.log('token: '+token);
    if (!token) {
      req.tokenStatus = 'none';
      _tokenAuthErr(req, res);
      return;
    }
    decoded = exports.getUserFromToken(token)
    if (decoded == -1) {
      req.tokenStatus = 'wrong';
      _tokenAuthErr(req, res);
      return;
    }

    req.tokenStatus = 'varified';
    req.userInfo = decoded;

    next(req, res);
  }
}

exports.auth = (next, err = _tokenAuthErr) => {
  return new _tokenAuth(next, err);
}
