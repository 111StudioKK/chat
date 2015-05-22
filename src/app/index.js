'use strict';

angular.module('chat', ['chat.config', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'mgcrea.ngStrap', 'firebase'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl as login'
            }).state('signin', {
                url: '/signin',
                templateUrl: 'app/signin/signin.html',
                controller: 'SigninCtrl as signin'
            }).state('main', {
                url: '/main',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl as main',
                resolve: {
                    messages: function(messageService){
                        return messageService.getLastMessages();
                    }
                }
            });
        $urlRouterProvider.otherwise('/login');
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