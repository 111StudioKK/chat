'use strict';

angular.module('chat')
    .service('messageService', function(messageFireService, $filter) {
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

        messageBO.getRenderedDate = function(message) {
            return '[<span class=\"chat-message-date\">' +
                $filter('date')(message.createdAt, 'HH:mm') +
                '</span>]';
        };

        messageBO.getRenderedText = function(message) {
            if ( _getAction(message) ) {
                return '<span class=\"chat-message-action\"><span class=\"chat-message-author\">' +
                    $filter('userNick')( message.author ) + '</span> ' +
                    message.content.split(_getAction(message)[0])[1] + '</span>';
            } else {
                return '<span class=\"chat-message-author\">&lt;' +
                    $filter('userNick')( message.author ) +
                    '&gt;</span> ' + message.content;
            }
        };

        messageBO.getRender = function(message) {
            return messageBO.getRenderedDate(message) + messageBO.getRenderedText(message);
        };

        // Private functions
        var _getAction = function(message) {
            return message.content.match(/^\/me\ /);
        };
    }).filter( 'messageRendering', function(messageService){
        return function(input) {
            return messageService.getRender(input);
        };
    });