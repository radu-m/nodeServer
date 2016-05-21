var express = require('express');
var router = express.Router();

var method = TodoEndpoint.prototype;

function TodoEndpoint(connection) {
    this._router = router;

    this._router.get('/:id', function(req, res) {
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
    this._router.post('/', function(req, res) {
        connection.createDocument(req.body, (e) => {
            res.sendStatus(500);
        }, (id) => {
            res.set('Resource-Location', id);
            res.sendStatus(201);
        }, 'todo');
    });

    this._router.put('/:id', function(req, res) {
        connection.updateDocument(req.params.id, req.body, (e) => {
            res.sendStatus(404);        
        }, () => {
            res.sendStatus(200);        
        });
    });

    this._router.delete('/:id', function(req, res) {
        connection.deleteDocument(req.params.id, (e) => {
            res.sendStatus(200);  
        }, (s) => {
            res.sendStatus(200);  
        });
    });
}

method.router = function() {
    return this._router;
}

module.exports = TodoEndpoint;
