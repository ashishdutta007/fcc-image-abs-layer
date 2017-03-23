//app.js - main business logic for the application
var express = require('express');
//Importing searchApi router object from apiroutes
var search_api = require('../api-routes/search.js').router;
//Instance of express server
//Export this instance to index.js
var app = express();

console.log('Inside app.js');

//Routing any request with /api to router logic
app.use('/api', search_api);

//Exporting the same express insatnce to listen on port
module.exports.app = app;
