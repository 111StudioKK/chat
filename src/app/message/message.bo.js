'use strict';

angular.module('chat')
    .service('messageService', function(messageFireService) {
        var messageBO = this;
        var messageDAO = messageFireService;

        messageBO.loaded = function() {
            return messageDAO.loaded();
        };

        messageBO.add = function(message) {
            return messageDAO.add(messageDAO.converter(message));
        };

        messageBO.getLastMessages = function() {
            return messageDAO.getLastMessages();
        };

    }).filter( 'messageRendering', function($filter){
        return function(input) {
            return '[<span class=\"chat-message-date\">' +
                $filter('date')(input.createdAt, 'HH:mm') +
                '</span>] <span class=\"chat-message-author\">' +
                $filter('userNick')( input.author ) +
                '</span> > ' + input.content;
        };
    });