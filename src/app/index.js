'use strict';

angular.module('chat', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'mgcrea.ngStrap', 'firebase'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl'
            }).state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            });
        $urlRouterProvider.otherwise('/login');
    })
    .service('fireService', function($firebaseAuth) {
        var service = this;
        var fireRef = new Firebase('https://chat111.firebaseio.com');
        var auth = $firebaseAuth(fireRef);

        service.auth = function(credentials) {
            return auth.$authWithPassword(credentials);
        };

        service.isLogged = function(){
        	return !!auth.$getAuth();
        };

        service.logout = function(){
        	auth.$unauth();
        };

        service.authObj = auth;

        return service;
    }).run(function(fireService, $state){

    	fireService.authObj.$onAuth(function(authData){
    		if(authData){
    			$state.go('main');
    		}
    		else{
    			$state.go('login');
    		}
    	});
    	
    });