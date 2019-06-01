console.log("start server");
console.log("initalizing...");
/////////////////////////////////////////
//include//
////////////////////////////////////////
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs =  require("fs");
////////////////////////////////////////

//load config
var configData = fs.readFileSync(__dirname+"/data/config.json", 'utf8');
var config = JSON.parse(configData);

//make app
const app = express();

//json init
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//set jwt and jwt key
app.set('jwt-secret', config['secret']);

app.set('views', __dirname);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(config['port'], function(){
  console.log("Express server has started on port "+config['port']);
});

app.use(express.static('.'));

var router = require(__dirname+'/router/main')(app, fs);
