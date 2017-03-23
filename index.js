//index.js is the entry point for the node application
//Importing express server instance from (/src/app.js)
var app = require('./app/app.js').app;
var port = process.env.PORT || 3000;

console.log('Inside index.js');

//Express Server listening on port
app.listen(port, function(error) {
    if (error) {
        return console.log('An error occured', error);
    } else {
        console.log('Express server listening on port', port);
    }
});
