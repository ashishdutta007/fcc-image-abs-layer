//All API requests routes/(API URLs) for express resides in routes.js
//The endpoints routes are defined here
var express = require('express');

//Creating a router object
//Router object is like a mini-express object
//Can be used for routing,logging,request param extraction for validation
var searchApi = express.Router();

console.log('Inside search.js');

//route middleware that will happen on every request
//logging every request
searchApi.use(function(request, response, next) {
    response.send("Inside Search API");
    request.on('error', function(error) {
        return console.log('Error occurrred', error);
    });
    response.on('error', function(error) {
        return console.log('Error occurrred', error);
    });

    //console.log("Request: ", request);
    console.log(request.method, request.url);

    next();
});

//route for imagesearch with the search param
searchApi.use('/imagesearch/:term', function(request, response, next) {
    request.on('error', function(error) {
        return console.log('Error occurrred', error);
    });
    response.on('error', function(error) {
        return console.log('Error occurrred', error);
    });
});

//route for latest images previously searched
searchApi.use('/latest', function(request, response, next) {
    response.send("You are Gen Z!!!!");
    request.on('error', function(error) {
        return console.log('Error occurrred', error);
    });
    response.on('error', function(error) {
        return console.log('Error occurrred', error);
    });
});


module.exports.router = searchApi;
