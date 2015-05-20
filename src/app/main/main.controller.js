'use strict';

angular.module('chat')
    .controller('MainCtrl', function ($scope, fireService, messages, messageService) {
        $scope.messages = messages;
        $scope.message = {};
        $scope.messageService = messageService;

        $scope.logout = function(){
            fireService.logout();
        };

        $scope.addMessage = function(){
            $scope.message.author = fireService.userData().uid;
            $scope.messageService.add($scope.message);
            $scope.message.content = '';
        };
  });
