var express = require("express");
var mongo = require("mongodb");
var app = express();


var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

app.use(express.bodyParser());

app.get('/', function(req, res) {
    res.send('<h3>HI!</h3>');
});

app.get('/scores.json', function(req, res) {
    mongo.Db.connect(mongoUri, function (err, db) {
	db.collection('scoresTemp', function (er, collection) {

	    var uname = req.query.username;
	    
	    var c = collection.find({username: uname}).sort("score").toArray(function(errr, x){
		res.send(x);
	    });

	});
    });
});

app.post('/submit.json', function(req, res) {
    mongo.Db.connect(mongoUri, function (err, db) {
	db.collection('scoresTemp', function (er, collection) {

	    var username = req.body.username;
	    var score = req.body.score;
	    var grid = req.body.grid;
	    var time = new Date();
	    var created_at = time.toString();
	    
	    collection.insert({"username": username, "score": score, "grid": grid, "created_at": created_at}, function (err, r){});
	    res.send("Added\n");

	});
    });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});
