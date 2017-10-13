(function () {
    'use strict';

    angular
        .module('otsmi')
        .controller('ViewParkingProvidersController', ViewParkingProvidersController);

    ViewParkingProvidersController.$inject = ['$scope', 'ParkingProviderService', 'AlerterService'];

    /* @ngInject */
    function ViewParkingProvidersController($scope, ParkingProviderService, AlerterService) {

        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        var vm = this;

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

