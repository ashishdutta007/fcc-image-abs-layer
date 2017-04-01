//mongo.js contains all mongodb operations 
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var model = require('../models/searchHistoryModel.js');
//MONGOLAB_URI for heroku-mLab deployment
var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/searcHistory';

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

//db operations functions
module.exports = {
    //Save search term in db for search history
    savesearchterm: function(searchData) {
        var newEntry = new searchHistoryModel(searchData);
        //.save() returns a promise
        var prms = newEntry.save();
        return prms;
    },
    //Query previous serach history
    findlatest: function() {
        //Build query by chaining with [mongoose helper methods] 
        var query = searchHistoryModel.find()
            //sort timestamp in desc order
            .sort({ timestamp: -1 })
            //limit to 10 docs
            .limit(10)
            //select the fields to return in response
            .select({ searchterm: 1, timestamp: 1, _id: 0 });
        //executing query at a later time
        //Returns a mongoose promise
        var queryPrms = query.exec();
        return queryPrms;
    },
    //Delete all search history
    clearhistory: function() {
        var query = searchHistoryModel.remove({});
        //query.exec() returns js promise
        var clrPrms = query.exec();
        return clrPrms;
    }
};
