var express = require("express");
var mongo = require("mongodb");
var app = express();


var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

app.use(express.bodyParser());

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/scores.json', function(req, res) {
    mongo.Db.connect(mongoUri, function (err, db) {
	db.collection('scoresTemp', function (er, collection) {

	    var c = collection.find({}).sort("score").toArray(function(errr, x){
		res.send(x);
	    });

	});
    });
});

app.post('/submit.json', function(req, res) {
    mongo.Db.connect(mongoUri, function (err, db) {
	db.collection('scoresTemp', function (er, collection) {

	    console.log(req.body);
	    var score = req.body.score;
	    var username = req.body.username;
	    
	    collection.insert({"score": score, "username": username}, function (err, r){});
	    res.send("Added");

	});
    });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});
