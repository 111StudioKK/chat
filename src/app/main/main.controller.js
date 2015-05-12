'use strict';

angular.module('chat')
  .controller('MainCtrl', function ($scope, fireService , messages) {
    $scope.messages = messages;

    $scope.message = {};

    $scope.message.author = fireService.userData().uid;


    $scope.logout = function(){
      fireService.logout();
    };

    $scope.addMessage = function(){

      $scope.message.createdAt = Firebase.ServerValue.TIMESTAMP;
      $scope.messages.$add($scope.message);
      $scope.message.content = '';

    };
  });
