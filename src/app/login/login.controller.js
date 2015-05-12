'use strict';

angular.module('chat')
  .controller('LoginCtrl', function ($scope, fireService) {


  	$scope.sendCredentials = function(credentials){

	fireService.auth(credentials).then(function(data){
	  		console.log(data);
	  	}).catch(function(error){
	  		console.log(error);
	  		$scope.error = error.message;
	  	});
	  	
  	};

  	
  });