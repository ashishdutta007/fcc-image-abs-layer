//All API requests routes/(API URLs) for express resides in routes.js
//The endpoints routes are defined here
var express = require('express');
//Creating a router object
//Router object is like a mini-express object
//Can be used for routing,logging,request param extraction for validation
var router = express.Router();

console.log('routes.js');

//route middleware that will happen on every request
//logging every request
router.use(function(request, response, next) {
    console.log("Request", request);
    console.log(request.method, request.url);
    next();
});

//route for inagesearch with the search param
router.use('imagesearch/:term', function(request, response, next) {

});

//route for latest images previously searched
router.use('/latest', function(request, response, next) {

});


