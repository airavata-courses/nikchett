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

console.log("this is result"+ result);

var response = JSON.stringify(result);

res.send(response);


});


app.get('/bookname', cors(),function(req, res){
	console.log(req.query.memberId);
//console.log("Waiting for java"+query.memberId);

var list = [
    { memberId: '1', bookname: 'Shining - ID101' },
    { memberId: '2', bookname: 'Gone Girl - ID102'},
    { memberId: '3', bookname: 'No book issued'},
     { memberId: '4', bookname: 'Dune - ID108' },
    { memberId: '5', bookname: 'Letters - ID106'},
    { memberId: '6', bookname: 'No book issued'}

];

 for(i =0; i <list.length; i++)
 {
 	if( list[i].memberId == req.query.memberId)
 		{
 			res.send(list[i].bookname);
 		}
 }

res.send("No records for memberId = "+ req.query.memberId);
});



app.listen(3001);