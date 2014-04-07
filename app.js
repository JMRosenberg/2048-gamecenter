var express = require("express");
var logfmt = require("logfmt");
var mongo = require("mongodb");
var app = express();

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

/*mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('mydocs', function (er, collection) {
	collection.insert({'numKey': 47}, {safe: true}, function (er, rs) {
	});
    });
});*/

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/scores.json', function(req, res) {
    mongo.Db.connect(mongoUri, function (err, db) {
	db.collection('scores', function (er, collection) {

	    var c = collection.find({}).sort("score").toArray(function(errr, x){
		res.send(x);
	    });

	});
    });
});

app.post('/submit.json', function(req, res) {
    mongo.Db.connect(mongoUri, function (err, db) {
	db.collection('scores', function (er, collection) {

	    

	});
    });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});
