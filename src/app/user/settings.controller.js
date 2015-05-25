'use strict';

var settingsCtrl = function(settingsService) {
    var settingsCtrl = this;

    settingsCtrl.data = {};

    settingsCtrl.save = function() {
        settingsService.save(settingsCtrl.data);
        settingsService.close();
    };
    settingsCtrl.cancel = function() {
        settingsService.close();
    };
};

angular.module('chat')
    .service('settingsService', function(userService){
        var service = this;
        service.show = function() {
            service.controller.ctrl.data = userService.getConverted(userService.getMe());
            service.popupElement.removeClass('hidden');
        };

        service.save = function(userSettings) {
            userService.modify(userSettings);
        };

        service.close = function() {
            service.popupElement.addClass('hidden');
        };
    })
    .controller('settingsCtrl', settingsCtrl)
    .directive('popupSettings', function(settingsService){
        // Runs during compile
        return {
            controller: 'settingsCtrl as ctrl',
            templateUrl: 'app/user/settings.html',
            link: function(ctrl, element) {
                settingsService.popupElement = element;
                settingsService.controller = ctrl;
            }
        };
    });