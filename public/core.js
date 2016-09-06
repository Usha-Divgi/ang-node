var app = angular.module('routerApp', ['home','ui.bootstrap']);

app.config(function( $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider ){
	 $urlMatcherFactoryProvider.strictMode(false);
    $urlRouterProvider.otherwise( 'home' );
   
})
