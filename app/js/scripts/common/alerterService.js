(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name otsmi.service:AlerterService
     * @description Contains wrapper functions which help us use Metronic theme alert API.
     */
    angular
        .module('otsmi')
        .factory('AlerterService', AlerterService);

    AlerterService.inject = [];
    function AlerterService() {
        var service = {
            // Create function pointers to exposed functions
            alert: alert,
            warning: warning,
            info: info,
            success: success,
            danger: danger
        };

        return service;

        /**
         * Shows an "info" alert using Metronic theme alert API. This warning message will use 'fa-information' as icon.
         * 
         * @param {string} message Alert's text message
         * @param {number} closeInSeconds  (optional) auto close after defined seconds. If set to 0, it will not close.
         */
        function success(message, closeInSeconds, icon) {
            alert('success', message, closeInSeconds, '');
        }

        /**
         * Shows a "danger" alert using Metronic theme alert API. The message will be prepended by a 'fa-exclamation' icon.
         * 
         * @param {string} message Alert's text message
         * @param {number} closeInSeconds  (optional) auto close after defined seconds. If set to 0, it will not close.
         */
        function danger(message, closeInSeconds) {
            alert('danger', message, closeInSeconds, 'exclamation');
        }

        /**
         * Shows an "info" alert using Metronic theme alert API. The message will be prepended by a 'fa-information' icon.
         * 
         * @param {string} message Alert's text message
         * @param {number} closeInSeconds  (optional) auto close after defined seconds. If set to 0, it will not close.
         */
        function info(message, closeInSeconds) {
            alert('info', message, closeInSeconds, 'information');
        }

        /**
         * Shows a "warning" alert using Metronic theme alert API.  The message will be prepended by a 'fa-warning' icon.
         * 
         * @param {string} message Alert's text message
         * @param {number} closeInSeconds  (optional) auto close after defined seconds. If set to 0, it will not close.
         */
        function warning(message, closeInSeconds) {
            alert('warning', message, closeInSeconds, 'warning');
        }

        /**
         * Shows an alert using Metronic theme alert API. The alert can be parameterized using a different type, message, 
         * number of seconds after which will be automatically closed and finally the icon which will be prepended before
         * the message.
         * 
         * @param {string} type Alert type. It can be one of the following: 'success','danger','info','warning'
         * @param {string} message Alert's text message
         * @param {number} closeInSeconds auto close after defined seconds. If set to 0, it will not close.
         * @param {string} icon (optional) put icon class before the message. It can be a Font Awesome icon like 'check' or 'warning' or 'exclamation'
         */
        function alert(type, message, closeInSeconds, icon) {


            var alertConfig = {
                container: $('#alert_container').val(), // alerts parent container
                place: 'prepend', // append or prepend in container 
                type: 'success', // alert's type It can be one of the following: 'success','danger','info','warning'
                message: 'Test alert', // alert's message
                close: true, // make alert closable 
                reset: false, // close all previouse alerts first 
                focus: true, // auto scroll to the alert after shown 
                closeInSeconds: 10000, // auto close after defined seconds
                icon: '' // put icon class before the message. It can be a Font Awesome icon like 'fa fa-check'
            };

            // override default configuration
            alertConfig.type = type || alertConfig.type;
            alertConfig.message = message || alertConfig.message;
            alertConfig.closeInSeconds = closeInSeconds || alertConfig.closeInSeconds;
            alertConfig.icon = icon || alertConfig.icon;

            // finally show the alert
            App.alert(alertConfig);
        }
    }
})();
