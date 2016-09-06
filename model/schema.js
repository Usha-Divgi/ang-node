var mongoose = require( 'mongoose' );
var Q = require('q');

var reminderSchema = new mongoose.Schema({
  time: String,
  event: String
 }, { collection : 'reminder' });

var Reminder =  mongoose.model('Reminder', reminderSchema);

exports.getAllReminder = Q.nfbind(Reminder.find.bind(Reminder));

exports.create = function(data){
   
    var event = new Reminder({event: data.event, time: data.time});

	/*event.save(function (err) {
		debugger
	  if (err) {
			return err;
	  }
	  else {
	  	return exports.getAllReminder();
	  }
	});*/

   return event.save().then(function() {
   	return exports.getAllReminder();
   });


};

exports.delete = function(id) {
	 return Reminder.remove({_id: id}).then(function(err,removed) {
		return exports.getAllReminder();
	});
};

exports.update = function() {

};