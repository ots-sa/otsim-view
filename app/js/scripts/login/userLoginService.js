(function () {
    'use strict';

    angular
        .module('otsmi')
        .factory('UserLoginService', UserLoginService);

    UserLoginService.inject = ['CommonService', '$http'];

    function UserLoginService(CommonService, $http) {
        var service = {
            login: login
        };

        return service;

        ////////////////


        function login(data) {

            var myconfig = {
                'headers': {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };

            var url = CommonService.getBaseUrl() + '/otsmi/login';

            var config = config || {};
            config.headers = myconfig.headers || {};

            return $http.post(url, data, config);
        }

    }
})();