'use strict';

angular.module('chat')
    .controller('MainCtrl', function (fireService, messages, messageService, settingsService) {
        var main = this;
        main.messages = messages;
        main.message = {};

        main.logout = function(){
            fireService.logout();
        };

        main.settings = function(){
            settingsService.show();
        };

        main.addMessage = function(){
            main.message.author = fireService.userData().uid;
            messageService.add(main.message);
            main.message.content = '';
        };
  });
