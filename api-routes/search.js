//All API requests routes/(API URLs) for express resides in routes.js
//The endpoints routes are defined here
var express = require('express');
var dbops = require('../db/mongo.js');
//Creating a router object - like a mini-express object
//Can be used for routing,logging,request param extraction for validation
var searchApi = express.Router();
var bing_apikey = '6f3df627fdd64daab3c97a10620903b0';
//npm bing-search api module 
var nodeBingApi = require("node-bing-api")({ accKey: bing_apikey });
console.log('Inside search.js');

//Route middleware that will happen on every request
//Logging every request
searchApi.use(function(request, response, next) {
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
    };

    //save new search data to mongodb
    dbops.savesearchterm(searchData)
        .then(function(docs) {
            console.log("Docs: ", docs);
            return console.log('Data saved successfully to db');
        }).catch(function(error) {
            response.status(500).json(error);
            return console.log('Data save failed');
        });

    //call bing search API
    nodeBingApi.images(searchterm, { top: 1 }, function(error, results, body) {
        if (error) {
            response.status(500).json(error);
            return console.log('An error occurred', error);
        } else {
            var returnResponse = {
                'webSearchURL': body.webSearchUrl,
                'hostPageURL': body.value[0].hostPageUrl,
                'altName': body.value[0].name,
                'suggestedURL': body.pivotSuggestions[0].suggestions[0].webSearchUrl,
                'suggestedAltName': body.pivotSuggestions[0].suggestions[0].text
            };
            response.status(200).json(returnResponse);
        }
    });

    //handling error events
    request.on('error', function(error) {
        response.status(500).json(error);
        return console.log('Error occurrred', error);
    });
    response.on('error', function(error) {
        response.status(500).json(error);
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
