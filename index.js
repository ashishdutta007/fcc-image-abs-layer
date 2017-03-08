//index.js is the entry point for the node application
//Importing express server object from (/src/app.js)

var app = require('./src/app.js').app;
var port = process.env.PORT || 3000;

console.log('index.js');

app.listen(port, function(error) {
    if (error) {
        return console.log('An error occured', error);
    } else {
        console.log('Express server listening on port', port);
    }
});
