angular.module('home', ['ui.router','ui.bootstrap'])
 .controller('homeCtrl', homeCtrl)
	 .config(function homeConfig($stateProvider) {
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'home/home.html',
			controller: 'homeCtrl',
			controllerAs: 'home',
			resolve: {
				Reminder: function($http) {
					return $http.get('api/todos');
				}
			}
		})
})
// .service('homeService', homeService)
// ;

function homeCtrl($scope, $http, Reminder, socket){
	var vm = this;
	vm.list = Reminder.data;
	/*socket.on('notification', function(data) {
		alert('something');
		console.log(data)
	     vm.socketInfo = data;
	     console.log( vm.socketInfo);

  	});*/

  	/*socket.on('notification', function (data) {
  		alert('something');
    $scope.name = data.name;
    $scope.users = data.users;
  });*/

	/*$scope.$on('$destroy', function (event) {
        socket.removeAllListeners();
        // or something like
        // socket.removeListener(this);
    });*/

     socket.emit('add-customer', $scope.currentCustomer);

     socket.on('notification', function(data) {
     	console.log(data);
    $scope.$apply(function () {
      $scope.newCustomers.push(data.customer);
    });
  });

	vm.save = function() {
		var data = {"event": vm.reminder.event, "time": new Date()};
		$http.post('/api/save', data).
		then(function(res){
			console.log(res);
			vm.list = res.data;
		},
		 function(err){
		 	console.log(err);
		 });
	};

	vm.delete = function(event) {
		var url = '/api/delete/'+ event._id;
		$http.delete(url).then(function (response) {
			console.log(response);
			vm.list = response.data;

		}, function (response) {
			console.log(response);
		});
	};

	vm.edit = function(event) {
		vm.eventToEdit = event;
	};

	function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

	$scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.popup1 = {
    opened: false
  };

	
};