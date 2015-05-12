'use strict';

angular.module('chat')
    .service('fireService', function($firebaseAuth, $firebaseArray) {
        var service = this;
        var fireRef = new Firebase('https://chat111.firebaseio.com');
        var auth = $firebaseAuth(fireRef);

        service.auth = function(credentials) {
            return auth.$authWithPassword(credentials);
        };

        service.isLogged = function() {
            return !!auth.$getAuth();
        };

        service.userData = function() {
            return auth.$getAuth();
        };
        service.logout = function() {
            auth.$unauth();
        };

        service.getMessages = function() {
            var messagesRef = fireRef.child('messages');
            return $firebaseArray(messagesRef);
        };

        service.authObj = auth;

        return service;
    });