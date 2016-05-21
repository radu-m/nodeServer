//Lets require/import the HTTP module
var express = require('express');
var bodyParser = require('body-parser');
var Database = require('./src/couch/database.js');
var TodoEndpoint = require('./src/endpoints/todo.js');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var database = new Database({
    ip: config.couchbase.ip,
    bucket: config.couchbase.bucket_name
});

var connection = database.connect(function(e) {
    console.log("Failed to connect to database. Exiting app...");
    process.exit();
});

var todoEndpoint = new TodoEndpoint(connection);

app.use('/todo', todoEndpoint.router());

app.listen(config.server_port, function() {
    console.log('App listening on port: ' + config.server_port);
});
