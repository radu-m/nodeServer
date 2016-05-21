var couchbase = require('couchbase');
var uuid = require('node-uuid');
var Connection = require('./connection.js');

var method = Database.prototype;

function Database(config) {
    this._config = config;
};

method.connect = function(onError) {
    if (!this._bucket) {
        this._cluster = new couchbase.Cluster(this._config.ip);
        this._bucket = this._cluster.openBucket(this._config.bucket, (err) => {
            if (err) {
                onError(err);
            }
        });
    }

    return new Connection(this._bucket);

};

module.exports = Database;
