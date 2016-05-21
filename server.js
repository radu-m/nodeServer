//Lets require/import the HTTP module
var express = require('express');
var bodyParser = require('body-parser');
var Database = require('./src/couch/database.js');
var TodoEndpoint = require('./src/endpoints/todo.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Lets define a port we want to listen to
const PORT=8080; 

var database = new Database({ip: '127.0.0.1', bucket: 'default'});

var connection = database.connect(function(e) {
    console.log("Failed to connect to database. Exiting app...");
    process.exit();
});

var todoEndpoint = new TodoEndpoint(connection);

app.use('/todo', todoEndpoint.router());

app.listen(PORT, function() {
    console.log('App listening on port: ' + PORT);
});
