(function () {
    'use strict';

    angular
        .module('otsmi')
        .factory('CommonService', CommonService);

    CommonService.inject = [];
    function CommonService() {
        var service = {
            getBaseUrl: getBaseUrl
        };

        return service;

        /**
         * Returns the base url which is used to access the Rest API.
         */
        function getBaseUrl() {
            return '/otsmi/api';
        }
    }
})();