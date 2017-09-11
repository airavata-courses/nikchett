var express = require('express');

var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var request = require('request');

var amqp = require('amqplib/callback_api');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/login', function(req, res) { 
	console.log("Received: "+(req)); 
	
	var creds = JSON.stringify(req.query);

	amqp.connect('amqp://localhost', function(err, conn) {
		console.log('In producer query --> query params' + creds);

		conn.createChannel(function(err, ch) {
		    ch.assertQueue('', {exclusive: true}, function(err, q) {
				var corr = generateUuid();
				
				ch.consume(q.queue, function(msg) {
					if (msg.properties.correlationId == corr) {
					  	console.log(' [.] Got %s', msg.content.toString());
					  	res.send(msg.content.toString());
					}
				}, {noAck: true}
				);

				ch.sendToQueue('login',
					new Buffer(creds),
					{ correlationId: corr, replyTo: q.queue }
				);
		    });
		});
	});
});

app.get('/category', function(req, res) { 
	console.log("Received: "+(req)); 
	
	var category = JSON.stringify(req.query);

	amqp.connect('amqp://localhost', function(err, conn) {
		console.log('In producer query --> query params' + category);

		conn.createChannel(function(err, ch) {
		    ch.assertQueue('', {exclusive: true}, function(err, q) {
				var corr = generateUuid();
				
				ch.consume(q.queue, function(msg) {
					if (msg.properties.correlationId == corr) {
					  	console.log(' [.] Got %s', msg.content.toString());
					  	res.send(msg.content.toString());
					}
				}, {noAck: true}
				);

				ch.sendToQueue('bookname',
					new Buffer(category),
					{ correlationId: corr, replyTo: q.queue }
				);
		    });
		});
	});
});

app.get('/membershipdetails', function(req, res) { 
	var membershipdetails = req.query.membershiptype;
	console.log("Received membershipdetails: "+(membershipdetails['membershiptype'])); 

	amqp.connect('amqp://localhost', function(err, conn) {
		console.log('In producer query --> query params' + req.query.membershiptype);

		conn.createChannel(function(err, ch) {
		    ch.assertQueue('', {exclusive: true}, function(err, q) {
				var corr = generateUuid();
				
				ch.consume(q.queue, function(msg) {
					if (msg.properties.correlationId == corr) {
					  	console.log(' [.] Got %s', msg.content.toString());
					  	res.send(msg.content.toString());
					}
				}, {noAck: true}
				);

				ch.sendToQueue('membershipdetails',
					new Buffer(membershipdetails),
					{ correlationId: corr, replyTo: q.queue }
				);
		    });
		});
	});
});

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}

app.listen(3000);