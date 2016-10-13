
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
//var io = require("./socket/socket.js")(app);

/*var server = require('http').Server(app);
var io = require('socket.io')(server);*/

var io = require('socket.io')(80);

app.use(express.static(__dirname + '/public'));   
app.use('/bower_components',  express.static(__dirname + '/bower_components'));    
 
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.get('*', function(req, res, next) {
        res.sendfile('./public/index.html');
        next(); 
});

io.on('connection', function(socket) {
   console.log('<<<<[app.js]>>>> New Connection');
  socket.on('addCustomer', function(customer) {
    io.emit('notification', {
      message: 'new customer',
      customer: customer
    });
  });
});

console.log("working");

 
var routes = require("./routes/routes.js")(app);
 
var server = app.listen(8080, function () {
    console.log("Listening on port %s...", server.address().port);
});