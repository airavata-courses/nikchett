var express = require('express');

var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//REST call to login microservice
app.get('/login', function(req, res) { 
	if(req.query.username != "" && req.query.password !=""){
		request.get({ url: "http://localhost:8080/login?username="+req.query.username+"&password="+req.query.password }, function(error, response, body) { 
			if (!error && response.statusCode == 200) { 
				res.send(response.body);
			} 
			else
			{
				res.sendStatus(response.statusCode);
			}

		}); 
	}
	else{
		res.sendStatus(400);
	}
});

//REST call to  microservice to get list of books with book details
app.get('/category', function(req, res) { 

	request.get({ url: "http://localhost:3001/category?category="+req.query.category}, function(error, response, body) { 
		if (!error && response.statusCode == 200) { 
			res.send(response.body);
		} 
	}); 
});

//REST call to microservice to get membership details depending on membership type
app.get('/membershipdetails', function(req, res) { 

 request.get({ url: "http://localhost:5000/?membershiptype="+req.query.membershiptype}, function(error, response, body) { 
 	if (!error && response.statusCode == 200) { 
 		res.send(response.body);
 	} 
 }); 
});


app.listen(3000);