
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static(__dirname + '/public'));   
app.use('/bower_components',  express.static(__dirname + '/bower_components'));    
 
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.get('*', function(req, res, next) {
        res.sendfile('./public/index.html');
        next(); 
});

 
var routes = require("./routes/routes.js")(app);
 
var server = app.listen(8080, function () {
    console.log("Listening on port %s...", server.address().port);
});