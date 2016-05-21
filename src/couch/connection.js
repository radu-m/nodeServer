var uuid = require('node-uuid');

var method = Connection.prototype;

function Connection(bucket) {
    this._bucket = bucket;
}

method.getDocument = function(id, onError, onSuccess) {
    this._bucket.get(id, (err, result) => {
        if (err) {
            onError(err);
        } else {
            onSuccess(result.value);
        }
    });
};

method.createDocument = function(body, onError, onSuccess, prefix) {
    prefix = prefix || '';
    var id = prefix + '-' + uuid.v4();
    this._bucket.insert(id, body, (err, result) => {
        if (err) {
            onError(err);
        } else {
            onSuccess(id);
        }
    });
}

method.updateDocument = function(id, body, onError, onSuccess) {
    this._bucket.replace(id, body, (err, result) => {
        if (err) {
            onError(err);
        } else {
            onSuccess();
        }
    });
}

method.deleteDocument = function(id, onError, onSuccess) {
    this._bucket.remove(id, (err, result) => {
        if (err) {
            onError(err);
        } else {
            onSuccess();
        }
    });
}

module.exports = Connection;
