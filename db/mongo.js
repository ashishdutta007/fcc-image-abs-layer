//mongo.js contains all mongodb operations 
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/searcHistory'

console.log('Inside mongo.js');

//Connect to mongodb instance
mongoose.connect(url, function(error) {
    if (error) {
        return console.log('Connection error ', error);
    } else {
        console.log("Connection to mongodb " + url + " successful");
    }
});

var dbconn = mongoose.connection;
