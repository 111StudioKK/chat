'use strict';

angular.module('chat')
    .service('messageFireService', function(fireService, $firebaseArray) {
        var messageDAO = this;
        var messagesRef = fireService.fireRef.child('messages');
        var messages = $firebaseArray(messagesRef);

        messageDAO.loaded = function() {
            return messages.$loaded();
        };

        messageDAO.add = function(message) {
            return messages.$add(message);
        };

        messageDAO.converter = function(data) {
            // return VO
            return {
                author: data.author,
                content: data.content,
                createdAt: data.createdAt || Firebase.ServerValue.TIMESTAMP
            };
        };

        messageDAO.getAll = function() {
            return messages;
        };

        messageDAO.getLastMessages = function() {
            var timestamp = (new Date()).getTime()-1000*60*60*24;
            return $firebaseArray(messagesRef.orderByChild('createdAt').startAt(timestamp, 'createdAt'));
        };
    });
