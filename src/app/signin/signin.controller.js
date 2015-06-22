'use strict';

angular.module('chat')
    .controller('SigninCtrl', function (userService, fireService) {
        var signin = this;
        signin.fields = [
            {
                type: 'input',
                key: 'email',
                templateOptions: {
                    placeholder: 'Email',
                    type: 'email',
                    label: 'Email',
                    required: true
                }
            },
            {
                type: 'input',
                key: 'password',
                templateOptions: {
                    placeholder: 'Password',
                    type: 'password',
                    label: 'Password',
                    required: true,
                    minlength: 6
                }
            },
            {
                type: 'input',
                key: 'passwordConfirm',
                templateOptions: {
                    placeholder: 'Confirm password',
                    type: 'password',
                    label: 'Confirm password',
                    required: true
                },
                validators: {
                    samePassword: '$viewValue !== $modelValue.password'
                }
            },
            {
                type: 'input',
                key: 'nick',
                templateOptions: {
                    placeholder: 'Nickname',
                    label: 'Nickname',
                    required: true
                }
            }
        ];
       signin.sendSigninCredentials = function(credentials) {
            userService.create(credentials).then(function(){
                /* If sign in succeed, we connect */
                fireService.auth(credentials).then(function(){
                    // Nothing to do here
                }).catch(function(error){
                    signin.error = error.message;
                });
            }).catch(function(error){
                signin.error = error.message;
            });
        };
    });