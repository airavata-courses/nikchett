var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var request = require('request');
var amqp = require('amqplib/callback_api');



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//Filter list and returns results contains the queried category
app.get('/category', cors(),function(req, res){

	var cat = req.query.category;

	var list = [
	    { category: 'Drama', bookname: 'Shining' },
	    { category: 'Fiction', bookname: 'Gone Girl'},
	    { category: 'Children', bookname: 'Harry potter'},
	    { category: 'Drama', bookname: 'Letters' },
	    { category: 'Fiction', bookname: 'Dune'},
	    { category: 'Children', bookname: 'Rupanzel'}
	];

	var result = [];

	 for(i =0; i <list.length; i++)
	 {
	 	if( list[i].category == cat)
	 		{
	 			result.push(list[i].bookname);
	 		}
	 }

	var response = JSON.stringify(result);

	res.send(response);

});

// Finding the book issued by member while login
app.get('/bookname', cors(),function(req, res){
	
	var list = [
	    { memberId: '1', bookname: 'Shining - ID101' },
	    { memberId: '2', bookname: 'Gone Girl - ID102'},
	    { memberId: '3', bookname: 'No book issued'},
	    { memberId: '4', bookname: 'Dune - ID108' },
	    { memberId: '5', bookname: 'Letters - ID106'},
	    { memberId: '6', bookname: 'No book issued'}

	];
	var memberPresent = false;
	 for(i =0; i <list.length; i++)
	 {
	 	if( list[i].memberId == req.query.memberId)
	 		{
	 			memberPresent = true;
	 			res.send(list[i].bookname);
	 		}
	 }
	if(memberPresent ==false)
	{
	res.send("No records for memberId = "+ req.query.memberId);
	}
});

// **************

function getBookList(category) {
	var list = [
	    { category: 'Drama', bookname: 'Shining' },
	    { category: 'Fiction', bookname: 'Gone Girl'},
	    { category: 'Children', bookname: 'Harry potter'},
	    { category: 'Drama', bookname: 'Letters' },
	    { category: 'Fiction', bookname: 'Dune'},
	    { category: 'Children', bookname: 'Rupanzel'}
	];

	var result = [];

	for(i = 0; i < list.length; i++)
	{
		if(list[i].category == category)
		{
			result.push(list[i].bookname);
		}
	}

	return JSON.stringify(result);
}

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'bookname';

    ch.assertQueue(q, {durable: false});
    ch.prefetch(1);
    console.log(' [x] Awaiting RPC requests');

    ch.consume(q, function reply(msg) {
		var json = JSON.parse(msg.content.toString());
		console.log(" json category: ", json.category);

		ch.sendToQueue(msg.properties.replyTo,
			new Buffer(getBookList(json.category)),
			{correlationId: msg.properties.correlationId}
		);

		ch.ack(msg);
    });
  });
});

//******************

amqp.connect('amqp://localhost', function(err, conn, req) {
		
  	conn.createChannel(function(err, ch) {
	    var q = 'hey';

	    ch.assertQueue(q, {durable: false});
	    console.log(" [*] Waiting for messages in  get %s. To exit press CTRL+C", q);
	    ch.consume(q, function(msg) {
	    console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});



app.listen(3001);