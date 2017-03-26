var mongoose = require('mongoose');
var mongodb = require('mongodb');

console.log('Inside searchHistoryModel.js');

//Create Schema for searchHistory collection data
var searchHistorySchema = new mongoose.Schema({
    searchterm: { type: String, required: true },
    timestamp: { type: Date, required: true }
});

//Model for searchHistory Data operations
var searchHistoryModel = mongoose.model('searchdata', searchHistorySchema);

module.exports.model = searchHistoryModel;
