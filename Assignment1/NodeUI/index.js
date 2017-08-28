var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname));

var session = require('client-sessions');

app.use(session
  ({
      cookieName: 'session',
      secret: 'random_string_goes_here',
      duration: 30 * 60 * 1000,
      activeDuration: 5 * 60 * 1000,
  }));


app.get('/', function(req, res){

console.log("this is in req");
//console.log(_dirname);
	//res.send('hellp');
 res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.listen(3002);