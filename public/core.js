var app = angular.module('routerApp', ['home']);

app.config(function( $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider ){
	 $urlMatcherFactoryProvider.strictMode(false);
    $urlRouterProvider.otherwise( 'home' );
   
})
