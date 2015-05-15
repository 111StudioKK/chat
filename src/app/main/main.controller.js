'use strict';

angular.module('chat')
  .controller('MainCtrl', function ($scope, userService, fireService , messages) {
    $scope.messages = messages;
    $scope.message = {};

    $scope.logout = function(){
      fireService.logout();
    };

    $scope.addMessage = function(){

      $scope.message.createdAt = Firebase.ServerValue.TIMESTAMP;
      $scope.messages.$add($scope.message);
      $scope.message.content = '';

    };

    userService.loaded().then( function(){
      $scope.message.author = userService.get(fireService.userData().uid).nick;
    } )

  });
