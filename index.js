const express = require('express');
const app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'usersdb';
let db;

MongoClient.connect(url, (err, client)=> {
	if (err) throw err;
	db = client.db(dbName);
})

app.get('/', function(req,res){
    res.send('hello world')
});

app.post('/insertNew', function(req,res){
    insertNew(function(err,result){
        if (err) throw err;
        res.send(result);
    });
});

app.get('/allUsers', (req, res) => {
	getUsers({}, function(err, results) {
		if (err) throw err;
		res.send(results);
	});
});

app.get('/users/:id', (req, res) => {
	getUsers(
		{'_id': new mongo.ObjectID(request.params.id)},

		function(err, results) {
			if (err) throw err;
			res.send(results);
		}
	);
});

function getUsers(args, callback) {
	const UsersCollection = db.collection('Users');
	UsersCollection.find(args).toArray(callback);
}

function insertNew(callback){
    const UsersCollection = db.collection('Users');

	UsersCollection.insertOne(
		{
			'username': 'John Doe201',
			'password': 'pasword201',
			'avatar': 'myimage201.jpg'
        }, 
	    callback);
    
}

function populateDb(callback){
    const UsersCollection = db.collection('Users');

	UsersCollection.insertMany([
		{
			'username': 'John Doe1',
			'password': 'pasword1',
			'avatar': 'myimage1.jpg'
        },
        {
			'username': 'John Doe2',
			'password': 'pasword2',
			'avatar': 'myimage2.jpg'
        }, 
        {
			'username': 'John Doe3',
			'password': 'pasword3',
			'avatar': 'myimage3.jpg'
        }, 
        {
			'username': 'John Doe4',
			'password': 'pasword4',
			'avatar': 'myimage4.jpg'
		},  
	], callback);
    
}

app.listen('3000', ()=> console.log('listening on port 3000'))