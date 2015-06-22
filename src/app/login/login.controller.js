'use strict';

angular.module('chat')
    .controller('LoginCtrl', function (fireService) {
        var login = this;
        login.fields = [
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
                    label: 'Email',
                    required: true,
                    minlength: 6
                }
            }
        ];
        login.sendCredentials = function(credentials){
            fireService.auth(credentials).then(function(data){
                console.log(data);
            }).catch(function(error){
                console.log(error);
                login.error = error.message;
            });
        };
    });