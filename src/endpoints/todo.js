var express = require('express');
var router = express.Router();

var method = TodoEndpoint.prototype;

const TYPE = 'todo';

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

    this._router.get('/', function(req, res) {
        connection.getDocumentsByType(TYPE, (e) => {
            res.sendStatus(500);
        }, (todos) => {
            res.send(todos);
        });
    });

    this._router.post('/', function(req, res) {
        if (req.body.type && req.body.type === TYPE) {
            connection.createDocument(req.body, (e) => {
                res.sendStatus(500);
            }, (id) => {
                res.set('Resource-Location', id);
                res.sendStatus(201);
            }, 'todo');
        } 
        else {
            // Bad request
            res.sendStatus(400);
        }
    });

    this._router.put('/:id', function(req, res) {
        if (req.body.type && req.body.type === TYPE) {
            connection.updateDocument(req.params.id, req.body, (e) => {
                res.sendStatus(404);        
            }, () => {
                res.sendStatus(200);        
            });
        } 
        else {
            // Bad request
            res.sendStatus(400);
        }
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
