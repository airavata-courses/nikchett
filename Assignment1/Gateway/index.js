var express = require('express');

var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var request = require('request');
//rabbit mq

var amqp = require('amqplib/callback_api');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//REST call to login microservice
// app.get('/login', function(req, res) {
// 	if(req.query.username != "" && req.query.password !=""){
// 		request.get({ url: "http://localhost:8080/login?username="+req.query.username+"&password="+req.query.password }, function(error, response, body) { 
// 			if (!error && response.statusCode == 200) { 
// 				res.send(response.body);
// 			} 
// 			else
// 			{
// 				res.sendStatus(response.statusCode);
// 			}

// 		}); 
// 	}
// 	else{
// 		res.sendStatus(400);
// 	}
// });



//REST call to microservice to get membership details depending on membership type
// app.get('/membershipdetails', function(req, res) { 

//  request.get({ url: "http://localhost:5000/?membershiptype="+req.query.membershiptype}, function(error, response, body) { 
//  	if (!error && response.statusCode == 200) { 
//  		res.send(response.body);
//  	} 
//  }); 
// });

//*******************

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