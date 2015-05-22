'use strict';

angular.module('chat')
    .controller('SigninCtrl', function (userService, fireService) {
        var signin = this;
        signin.sendSigninCredentials = function(credentials) {
            userService.create(credentials).then(function(data){
                /* If sign in succeed, we connect */
                fireService.auth(credentials).then(function(data){
                    // Nothing to do here
                }).catch(function(error){
                    signin.error = error.message;
                });
            }).catch(function(error){
                signin.error = error.message;
            });
        };
    });