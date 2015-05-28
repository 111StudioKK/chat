'use strict';

angular.module('chat')
    .service('userFireService', function(fireService, $firebaseObject, $firebaseArray, config) {
        var userDAO = this;
        var usersRef = fireService.fireRef.child('users');
        var users = $firebaseObject(usersRef);
        var userList = $firebaseArray(usersRef);
        var awayTime = config.awayTime;

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
                lastInteraction: data.lastInteraction || 0,
                isConnected: data.isConnected || false
            };
        };

        userDAO.isAway = function(user) {
            return user.lastInteraction < (new Date()).getTime()-1000*60*awayTime;
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
                if (bool) {
                    users[userId].lastInteraction = Firebase.ServerValue.TIMESTAMP;
                }
                return users.$save();
            }
            return false;
        };
    });
