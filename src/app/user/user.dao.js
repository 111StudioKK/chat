'use strict';

angular.module('chat')
    .service('userFireService', function(fireService, $firebaseObject, $firebaseArray) {
        var userDAO = this;
        var usersRef = fireService.fireRef.child('users');
        var users = $firebaseObject(usersRef);
        var userList = $firebaseArray(usersRef);

        userDAO.loaded = function() {
            return users.$loaded();
        };

        userDAO.create = function(user) {
            users[user.id] = user;
            return users.$save();
        };

        userDAO.modify = function(user) {
            users[user.id] = user;
            return users.$save();
        };

        userDAO.delete = function(userId) {
            // Delete data
            delete users[userId];
            return users.$save();
        };

        userDAO.converter = function(data) {
            // return VO
            return {
                id: data.id,
                nick: data.nick,
                email: data.email,
                isConnected: data.isConnected || false
            };
        };

        userDAO.get = function(userId) {
            return users[userId];
        };

        userDAO.getAll = function() {
            return userList;
        };

        // Set flag for connection using userId and boolean
        userDAO.setConnected = function(userId, bool) {
            if ( users[userId] ){
                users[userId].isConnected = bool;
                return users.$save();
            }
            return false;
        };
    });
