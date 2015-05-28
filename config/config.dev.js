'use strict';

angular.module('chat.config', [])
    .constant('config', {
        'firebaseURL': 'https://chat111.firebaseio.com',
        'env': 'dev',
        'awayTime': 3
    });