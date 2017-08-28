var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var request = require('request');

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


app.listen(3001);