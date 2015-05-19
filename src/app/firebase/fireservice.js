'use strict';

angular.module('chat')
    .service('fireService', function($firebaseAuth, $firebaseArray, config) {
        var service = this;

        service.fireRef = new Firebase(config.firebaseURL);

        var auth = $firebaseAuth(service.fireRef);

        service.auth = function(credentials) {
            return auth.$authWithPassword(credentials);
        };

        service.signin = function(credentials) {
            console.log(credentials);
            return auth.$createUser(credentials);
        };

        // Impossible for now, TODO
        /*service.deleteUser = function(userId) {
            return auth.$removeUser(userId);
        };*/

        service.isLogged = function() {
            return !!auth.$getAuth();
        };

        service.userData = function() {
            return auth.$getAuth();
        };
        service.logout = function() {
            auth.$unauth();
        };
        service.converter = function(user) {
            return {
                email:user.email,
                password: user.password
            };
        };

        service.getMessages = function() {
            var messagesRef = service.fireRef.child('messages');
            var timestamp = (new Date()).getTime() - 1000*60*60*24*4;
            return $firebaseArray(messagesRef.orderByChild('createdAt').startAt(timestamp));
        };

        service.authObj = auth;

        return service;
    });