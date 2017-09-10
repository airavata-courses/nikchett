var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname));

//rabbitmq 
var amqp = require('amqplib/callback_api');

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/views/login.html'));
});

//  sending through Rabbitmq

amqp.connect('amqp://localhost', function(err, conn) {
	console.log('in send amq');
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer('Hello World!'));
    console.log(" [x] Sent 'Hello World!'");
  });
});
//setTimeout(function(conn) { conn.close(); process.exit(0) }, 500);

app.listen(3002);