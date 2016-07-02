var challongeApi = require('./api-basics.js');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


// Connection URL
// var url = 'mongodb://localhost:27017/SmAsheville';

var database = {};
var dbObj = {};


// TODO: make this less awkward
// TODO: change this to allow for future non-smasheville users
database.connect = function(dbName) {

    // Use connect method to connect to the server

    var url = 'mongodb://localhost:27017/' + dbName;

    var dbObj = new Promise(function (resolve, reject) {
        MongoClient.connect(url, function(err, db) {
          assert.equal(null, err);
          if (err){
            console.log('SOMTHING WENT SOUTH');
            reject();
          }
          resolve(db);
        });
    });

    return dbObj.then(function (db) {
        return db;
    });
};

// TODO: update these database functions to not be terrible
database.close = function() {
    dbObj.close();
    console.log("Disconnected succesfully from server");
};


database.populateTournaments = function(data, col) {
    database.connect('SmAsheville').then(function (db) {
        console.log('connected to mongoDB');

        var collection = db.collection(col);
        var promiseArray = [];

        for (var item of data) {
            promiseArray.push(tournamentPromise(item.tournament, collection));
        }

        console.log(promiseArray);

        Promise.all(promiseArray).then(function () {
            console.log('all inserts done, closing...');
            db.close();
            console.log('closed');
        });
    });
};
// helper function to keep from creating a function inside of a loop
function tournamentPromise(document, collection) {
    return new Promise(function(resolve, reject) {

        collection.insert(
            document,
            function(err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                assert.equal(1, result.ops.length);
                console.log("Inserting " + document.name + " into '" + collection.s.name + "'");
                resolve(result);
            }
        );

    });
}

database.populateParticipants = function (data, col) {

};

database.populateMatches = function (data, col) {

};

module.exports = database;


// /*--------------CODE GRAVEYARD--------------*/
//
// rip
//
// database.insert = function(db, col, newDoc, callback) {
//
//     // Get the collection
//     var collection = db.collection(col);
//     // Insert some documents
//     collection.insert(
//         newDoc,
//         function(err, result) {
//             assert.equal(err, null);
//             assert.equal(1, result.result.n);
//             assert.equal(1, result.ops.length);
//             console.log("Inserted sum documents into the collection");
//
//             callback();
//     });
//
// };