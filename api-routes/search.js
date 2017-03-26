//All API requests routes/(API URLs) for express resides in routes.js
//The endpoints routes are defined here
var express = require('express');
var dbops = require('../db/mongo.js');
//Creating a router object - like a mini-express object
//Can be used for routing,logging,request param extraction for validation
var searchApi = express.Router();
//npm bing-search api module 
//var bing_search = require('bing.search');
var bing_search = require('node-bing-api').({ accKey: 'ecd9d839f6824164b5dd8c5a47600b5d' });
var bing_apikey = 'ecd9d839f6824164b5dd8c5a47600b5d';
//console.log('Inside search.js');

//Route middleware that will happen on every request
//Logging every request
searchApi.use(function(request, response, next) {
    response.send("Inside Search API");
    request.on('error', function(error) {
        return console.log('Error occurrred', error);
    });
    response.on('error', function(error) {
        return console.log('Error occurrred', error);
    });
    console.log(request.method, request.url);
    next();
});

//route for imagesearch with the search param
searchApi.get('/imagesearch/:term', function(request, response, next) {
    var searchterm = request.params.term;
    console.log("searchterm: ", searchterm);
    var timestamp = Date.now();
    console.log("timestamp: ", timestamp);
    var searchData = {
            'searchterm': searchterm,
            'timestamp': timestamp
        }
        //save new search data to mongodb
    dbops.savesearchterm(searchData)
        .then(function(docs) {
            console.log("Docs: ", docs);
            return console.log('Data saved successfully to db');
        }).catch(function(error) {
            return console.log('Data save failed');
        });


    //call bing search API code
    var search = new bing_search(bing_apikey);
    search.images(searchterm, { top: 5 }, function(error, results, body) {
        if (error) {
            return console.log('An error occurred', error);
            response.send('Error');
        } else {
            console.log('Search results body: ', body);
        }
    });

    //handling error events
    request.on('error', function(error) {
        return console.log('Error occurrred', error);
    });
    response.on('error', function(error) {
        return console.log('Error occurrred', error);
    });
});

//route for latest images previously searched
searchApi.get('/latest', function(request, response, next) {
    response.send("You are Gen Z!!!!");
    request.on('error', function(error) {
        return console.log('Error occurrred', error);
    });
    response.on('error', function(error) {
        return console.log('Error occurrred', error);
    });
});

module.exports.router = searchApi;
