'use strict';

angular.module('chat')
    /* Login controller definition */
    .controller('LoginCtrl', function (fireService) {
        var login = this;
        /* Click on the login button */
        login.sendCredentials = function(credentials){
            fireService.auth(credentials).then(function(data){
                console.log(data);
            }).catch(function(error){
                console.log(error);
                login.error = error.message;
            });
        };
    });