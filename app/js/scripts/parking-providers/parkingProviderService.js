(function () {
    'use strict';

    angular
        .module('parkalot.parking.providers')
        .factory('ParkingProviderService', ParkingProviderService);

    ParkingProviderService.inject = ['CommonService', '$http'];

    function ParkingProviderService(CommonService, $http) {
        var service = {
            createProvider: createProvider,
            getAllProviders: getAllProviders
        };

        return service;

        ////////////////


        function createProvider(providerObj) {

            var myconfig = {
                'headers': {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };

            var url = CommonService.getBaseUrl() + '/parking/providers';

            var config = config || {};
            config.headers = myconfig.headers || {};

            return $http.post(url, providerObj, config);
        }

        function getAllProviders() {

        }
    }
})();