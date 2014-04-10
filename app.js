var express = require("express");
var mongo = require("mongodb");
var app = express();

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

app.use(express.bodyParser());
app.use(express.json());

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");//X-Requested-With");
    next();
});

app.get('/', function(req, res) {
    mongo.Db.connect(mongoUri, function (err, db) {
	db.collection('scores', function (er, collection) {
	    var c = collection.find().toArray(function(errr, x){
		var resString = "<table><tr><th>Username</th><th>Score</th><th>Time</th></tr>";
		x.sort(function(a,b){return b.score-a.score});
		for(var i = 0; i < x.length; i++){
		    resString += "<tr><td>" + x[i].username + "</td><td>" + x[i].score + "</td><td>" + x[i].created_at + "</td></tr>";
		}
		resString += "</table>";
		res.send(resString);
	    });
	});
    });
});

app.get('/scores.json', function(req, res) {
    mongo.Db.connect(mongoUri, function (err, db) {
	db.collection('scores', function (er, collection) {
	    var uname = req.query.username;
	    var c = collection.find({username: uname}).toArray(function(errr, x){
		x.sort(function(a,b){return b.score-a.score});
		res.send(x);
	    });
	});
    });
});

app.post('/submit.json', function(req, res) {
    if(req.body.username === undefined || req.body.username === null){
	res.send(400);
    }
    else if(req.body.score === undefined || req.body.score === null){
	res.send(400);
    }
    else if(req.body.grid === undefined || req.body.grid === null){
	res.send(400);
    }
    else {
	mongo.Db.connect(mongoUri, function (err, db) {
	    db.collection('scores', function (er, collection) {
		var username = req.body.username;
		var score = req.body.score;
		var grid = req.body.grid;
		var time = new Date();
		var created_at = time.toString();
		collection.insert({"username": username, "score": score, "grid": grid, "created_at": created_at}, function (err, r){});
		res.send();
	    });
	});
    }
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});
