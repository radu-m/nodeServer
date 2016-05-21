//Lets require/import the HTTP module
var couchbase = require('couchbase');
var express = require('express');
var uuid = require('node-uuid');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Lets define a port we want to listen to
const PORT=8080; 

var cluster = new couchbase.Cluster('127.0.0.1');
var bucket = cluster.openBucket('default', function(err) {
    if (err) {
        console.log("Failed to connect to couchbase");
    }
});

app.get('/todo/:id', function(req, res) {
    bucket.get(req.params.id, function(err, result) {
        if (err) {
            res.send('Error while get ' + req.params.id);
        } else {
            res.send(result.value);
        }
    });
});

app.get('/todo', function(req, res) {
});

app.post('/todo', function(req, res) {
    var id = 'todo-' + uuid.v4();
    console.log(req.params);
    bucket.insert(id, req.body, function(err, result) {
        if (err) {
            res.send('Error while post');
        } else {
            res.set('Content-Type', 'text/plain');
            res.set('Resource-Location', id);
            res.sendStatus(201);
        }
    });
});

app.put('/todo/:id', function(req, res) {
    bucket.replace(req.params.id, req.body, function(err, result) {
        if (err) {
            res.send('Error while put');
        } else {
            res.send("Success on put");
        }
    });
});

app.delete('/todo/:id', function(req, res) {
    bucket.remove(req.params.id, function(err, result) {
        if (err) {
            res.send('Error while delete ' + req.params.id);
        } else {
            res.send('Success delete');
        }
    });
});

app.listen(PORT, function() {
    console.log('App listening on port: ' + PORT);
});
