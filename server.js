//Lets require/import the HTTP module
var express = require('express');
var bodyParser = require('body-parser');
var Database = require('./src/couch/database.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Lets define a port we want to listen to
const PORT=8080; 

var database = new Database({ip: '127.0.0.1', bucket: 'default'});

var connection = database.connect(function(e) {
    console.log("Failed to connect to database");
});

app.get('/todo/:id', function(req, res) {
    connection.getDocument(req.params.id, (e) => {
        res.sendStatus(404);
    },
    (doc) => {
        res.send(doc);
    });
});
//
// app.get('/todo', function(req, res) {
// });
//
app.post('/todo', function(req, res) {
    connection.createDocument(req.body, (e) => {
        res.sendStatus(500);
    }, (id) => {
        res.set('Resource-Location', id);
        res.sendStatus(201);
    }, 'todo');
});

app.put('/todo/:id', function(req, res) {
    connection.updateDocument(req.params.id, req.body, (e) => {
        res.sendStatus(404);        
    }, () => {
        res.sendStatus(200);        
    });
});

app.delete('/todo/:id', function(req, res) {
    connection.deleteDocument(req.params.id, (e) => {
        res.sendStatus(200);  
    }, (s) => {
        res.sendStatus(200);  
    });
});

app.listen(PORT, function() {
    console.log('App listening on port: ' + PORT);
});
