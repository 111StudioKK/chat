'use strict';

angular.module('chat')
    .service('userService', function(userFireService, fireService) {
        var userBO = this;
        var userDAO = userFireService; // change that (config?)

        userBO.create = function(user) {
            // Firebase user creation
            return fireService.signin(fireService.converter(user)).then( function(userData) {
                // User VO creation in case of success
                user.id = userData.uid;
                return userDAO.create(userDAO.converter(user));
            });

        };

        userBO.modify = function(user) {
            // Verification of data
            // Save data in db
            return userDAO.modify(userDAO.convert(user));
        };

        /* Because of ghost users risk, won't do that for now.
         * TODO: delete accound with password asking
        userBO.delete = function(userId) {
            // Delete firebase user
            // Impossible to delete without password for now
            // Ghost users will ensue
            return userDAO.delete(userId).then( function() {
                return fireService.deleteUser(userId);
            });
        };*/

        userBO.getAll = function() {
            return userDAO.getAll();
        };
/*
        userBO.getConnectedUser = function() {
            // get connected users
        };*/

    }).run(function(userFireService, fireService, $state){
        var userDAO = userFireService;
        var connectedUser = null;

        // handling connection flag
        fireService.authObj.$onAuth( function(authData) {
            if ( authData ) {
                connectedUser = authData.uid;
                userDAO.setConnected(connectedUser, true);
            } else if ( connectedUser ) {
                userDAO.setConnected(connectedUser, false);
                connectedUser = null;
            }
        });
    });