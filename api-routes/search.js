//All API requests routes/(API URLs) for express resides in routes.js
//The endpoints routes are defined here
var express = require('express');
var dbops = require('../db/mongo.js');
//Creating a router object - like a mini-express object
//Can be used for routing,logging,request param extraction for validation
var searchApi = express.Router();
var bing_apikey = 'b964206531c148c5875c82d4ad97959b';
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

//Route for imagesearch with the search param
searchApi.get('/imagesearch/:term', function(request, response, next) {
    //Retrieving search term as path param 
    var searchterm = request.params.term;
    //Retrieving qery param offset for pagination
    var queryparam = request.query.offset || 10;
    console.log("searchterm: ", searchterm);
    console.log("queryparam: ", queryparam);
    if (queryparam >= 100) {
        queryparam = 100;
    }
    //Set current date time
    var timestamp = Date.now();
    console.log("timestamp: ", timestamp);
    var searchData = {
        'searchterm': searchterm,
        'timestamp': timestamp
    };

    //Save new search data to mongodb
    dbops.savesearchterm(searchData)
        .then(function(docs) {
            console.log("Docs: ", docs);
            return console.log('Data saved successfully to db');
        }).catch(function(error) {
            response.status(500).json(error);
            return console.log('Data save failed');
        });

    //Call bing search API
    nodeBingApi.images(searchterm, { top: queryparam }, function(error, results, body) {
        if (error) {
            response.status(500).json(error);
            return console.log('An error occurred', error);
        } else {
            //.map() takes an array and calls a function on 
            //each element in order & returns an array
            //var returnResponse = body.value.map(createResponse);
            //response.status(200).json(returnResponse);
            response.status(200).json(body.value.map(createResponse));
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

//Route for latest images previously searched[search history]
searchApi.get('/latest', function(request, response) {
    dbops.findlatest()
        .then(function(result) {
            console.log(result);
            response.status(200).json(result);
        })
        .catch(function(error) {
            response.status(500).json(error);
            return console.log("Fetch error occurred ", error);
        });

    request.on('error', function(error) {
        response.status(500).json(error);
        return console.log('Error occurrred', error);
    });
    response.on('error', function(error) {
        response.status(500).json(error);
        return console.log('Error occurrred', error);
    });
});

searchApi.get('/clear-all', function(request, response) {
    dbops.clearhistory()
        .then(function(results) {
            response.status(200).json(results);
        })
        .catch(function(error) {
            return console.log("Search History not cleared ", error);
            response.status(500).json(error);
        });

    request.on('error', function(error) {
        response.status(500).json(error);
        return console.log('Error occurrred', error);
    });
    response.on('error', function(error) {
        response.status(500).json(error);
        return console.log('Error occurrred', error);
    });
});
//function operating on each element of the array to return 
//json response corresponding each element
function createResponse(image) {
    var returnResponse = {
        'webSearchURL': image.webSearchUrl,
        'hostPageURL': image.hostPageUrl,
        'altName': image.name
    };
    return returnResponse;
}

module.exports.router = searchApi;
