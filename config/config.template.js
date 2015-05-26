'use strict'

/**
 * You have to copy this file to config.<username>.js and modify
 * the settings to use the app
 */
angular.module('chat.config', [])
    .constant('config', {
        'firebaseURL': 'https://chat111.firebaseio.com',
        'env': 'dev'
    });