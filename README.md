# Todo Server

The api is written in NodeJs with ExpressJs. The api communicates with a NoSQL database(Couchbase) to fetch and store data. The single endpoint exposed by the api serves the todos for a single user.

## How to run the server
First you need a running Couchbase database. For convenienve i have a database running which the server will try to connect by default.

```sh
$ npm install
```
```sh
$ node ./server.js
```

These are all the steps required to fire the server. The server will start by default on port 8080. You can change configuration in the config.json file. Note that the client will be setup to point to 8080 by default. If you change the default port of the server you will have to do the same for the client.

## Run your own Couchbase

In case you want to run against your own couchbase database, you will need to modify the config.json file to point to your Couchbase instance and chagne the bucket name according to your instance.

You will have to create a single view. The design document must be called 'all' and the view within it must be called 'type'.
The map method is given below.
```
function (doc, meta) {
  if (doc.type) {
      emit(doc.type, doc);
  }
}
```
