angular.module('home', ['ui.router'])
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

function homeCtrl($scope, $http, Reminder){
	console.log(Reminder);
	var vm = this;
	vm.list = Reminder.data;

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
	
};