var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


//const request = require('request-promise-native')

app.use(cors());

app.get('/', cors(),function(req, res){

	var cat = req.query.category;
	console.log(req);
console.log(req.body);
console.log(req.body.category);
	console.log(cat+ "this is category");

var list = [
    { category: 'Drama', bookname: 'Jane Austen' },
    { category: 'Fiction', bookname: 'Gone Girl'},
    { category: 'Children', bookname: 'harry potter'},
     { category: 'Drama', bookname: 'Letters' },
    { category: 'Fiction', bookname: 'GOT'},
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

console.log("this is result"+ result);

var response = JSON.stringify(result);

res.send(response);


});


app.get('/bookname', cors(),function(req, res){
console.log("Waiting for java");
res.send("hello to java");
});



app.listen(3001);