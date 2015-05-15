'use strict';

angular.module('chat')
    .service('userFireService', function(fireService, $firebaseObject) {
        var userDAO = this;
        var usersRef = fireService.fireRef.child('users');
        var users = $firebaseObject(usersRef);

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
            unset(users[user.id]);
            return users.$save();
        };

        userDAO.converter = function(data) {
            // return VO
            return {
                id: data.id,
                nick: data.nick,
                email: data.email
            };
        };

        userDAO.get = function(userId) {
            return users[userId];
        };

        userDAO.getAll = function() {
            return users;
        };
    });