'use strict';

angular.module('chat')
    .service('userService', function(userFireService, fireService) {
        var userBO = this;
        var userDAO = userFireService; // change that (config?)

        userBO.loaded = function() {
            return userDAO.loaded();
        };

        userBO.create = function(user) {
            // Firebase user creation
            return fireService.signin(fireService.converter(user)).then( function(userData) {
                // User VO creation in case of success
                user.id = userData.uid;
                return userDAO.create(userBO.getConverted(user));
            });

        };

        userBO.modify = function(user) {
            // Verification of data
            // Save data in db
            return userDAO.modify(userBO.getConverted(user));
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

        userBO.get = function(userId) {
            return userDAO.get(userId);
        };

        userBO.getMe = function() {
            return userBO.get(fireService.userData().uid);
        };

        userBO.getAll = function() {
            return userDAO.getAll();
        };

        userBO.getConverted = function(user) {
            return userDAO.converter(user);
        };
/*
        userBO.getConnectedUser = function() {
            // get connected users
        };*/

    }).filter( 'userNick', function(userFireService){
        var userDAO = userFireService;
        return function(input) {
            return input.nick ?
                    input.nick :
                    (userDAO.get(input)?
                        userDAO.get(input).nick:
                        input);
        };
    }).filter( 'userStatus', function($filter){
        return function(user) {
            var status = (user.isConnected)?'status-online':'status-offline';
            return '<span class=\"chat-user ' + status + '\">' +
                    $filter('userNick')( user ) + '</span>';
        };
    }).run(function(userFireService, fireService){
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