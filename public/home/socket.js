var app = angular.module('routerApp');
app.factory('socket', ['$rootScope', function($rootScope) {
  //var socket = io.connect();

   var socket = io('http://localhost/');

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}]);