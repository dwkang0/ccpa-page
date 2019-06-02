console.log("start server");
console.log("initalizing...");

global.__base = __dirname + '/';
/////////////////////////////////////////
//include//
////////////////////////////////////////
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs =  require("fs");
////////////////////////////////////////

//load config
var config = require('./config.js');

//make app
const app = express();

//json init
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//set jwt and jwt key
app.set('jwt-secret', config.secret);

app.set('views', '.');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('.'));
app.get('/', require('./page'));
app.use('/api', require('./api'));

var server = app.listen(config.port, function(){
  console.log("Express server has started on port "+config.port);
});
//var router = require(__dirname+'/router/main')(app, fs);
// const router = express.Router();
// const controller = require
