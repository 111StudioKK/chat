'use strict';

angular.module('chat')
    /* Login controller definition */
    .controller('LoginCtrl', function ($scope, fireService) {
        /* Click on the login button */
        $scope.sendCredentials = function(credentials){
            fireService.auth(credentials).then(function(data){
                console.log(data);
            }).catch(function(error){
                console.log(error);
                $scope.error = error.message;
            });
        };
    });