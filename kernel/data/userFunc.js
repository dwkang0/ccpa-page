const fs = require('fs');

exports.get = () => {
  var data = fs.readFileSync(__dirname+'/user.json', 'utf8');
  return JSON.parse(data);
}

exports.create = (username, name, pass) => {
  console.log('user create');
  var users = exports.get();
  if(users[username]) return -1;
  users[username] = {name: name, password: pass};
  fs.writeFileSync(__dirname+'/user.json',
    JSON.stringify(users, null, '\t'), "utf8");

  return 0;
}
