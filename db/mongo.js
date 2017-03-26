//mongo.js contains all mongodb operations 
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var model = require('../models/searchHistoryModel.js');
var url = 'mongodb://localhost:27017/searcHistory';

console.log('Inside mongo.js');

mongoose.Promise = global.Promise;
//Connect to mongodb instance
mongoose.connect(url, function(error) {
    if (error) {
        return console.log('Connection error ', error);
    } else {
        console.log("Connection to mongodb " + url + " successfull");
    }
});

var dbconn = mongoose.connection;
var searchHistoryModel = model.model;

module.exports = {
    savesearchterm: function(searchData) {
        var newEntry = new searchHistoryModel(searchData);
        var prms = newEntry.save();
        return prms;
    }
};
