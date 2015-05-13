'use strict';

angular.module('chat')
    .controller('SigninCtrl', function ($scope, fireService) {
        $scope.sendSigninCredentials = function(credentials) {
            fireService.signin(credentials).then(function(data){
                /* If sign in succeed, we connect */
                fireService.auth(credentials).then(function(data){
                    console.log(data);
                }).catch(function(error){
                    console.log(error);
                    $scope.error = error.message;
                });
                console.log(data);
            }).catch(function(error){
                console.log(error);
                $scope.error = error.message;
            });
        };
    });