'use strict';

angular.module('chat')
  .controller('MainCtrl', function ($scope, fireService) {
    $scope.logout = function(){
      fireService.logout();
    };
  });
