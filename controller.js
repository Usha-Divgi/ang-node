
var db = require('./model/db');
var model = require('./model/schema');
var Q = require('q');
var io = require('./socket/socket');

exports.getAllData = function (req, res) {

Q(model.getAllReminder())
  .then(function (data) {
  	io.emit('notification', {
      message: 'new event'
    });
    res.send(data);
  })
	
};

exports.saveData = function(req, res) {
	Q(model.create(req.body))
  .then(function (data) {
  		
    res.send(data);
  })
};

exports.deleteData = function(req, res) {
	Q(model.delete(req.params.id))
	.then(function(data){
		debugger
		res.send(data);
	})

};


 
