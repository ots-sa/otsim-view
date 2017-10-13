(function () {
    'use strict';

    angular
        .module('parkalot.parking.providers')
        .controller('CreateParkingProviderController', CreateParkingProviderController);

    CreateParkingProviderController.inject = ['$scope', '$state', 'ParkingProviderService', 'AlerterService'];

    function CreateParkingProviderController($scope, $state, ParkingProviderService, AlerterService) {

        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.createProvider = createProvider;
            vm.cancel = cancel;
        }

        function createProvider() {

            var postData = {
                'name': vm.providerName,
                'address': {
                    'street': vm.addressStreet,
                    'streetNumber': vm.addressNumber,
                    'zipCode': vm.addressZipcode,
                    'city': vm.addressCity,
                    'country': vm.addressCountry

                },
                'parkingAreas':null
            }

            ParkingProviderService.createProvider(postData)
                .success(onCreateProviderSuccess)
                .error(onCreateProviderError);
        }

        function onCreateProviderSuccess(result) {
            AlerterService.success('Parking Provider has been create successfully!', 5);
            clearForm();
        }


        function onCreateProviderError(result) {
            AlerterService.danger('There was an error saving the new Parking Provider', 5);
        }

        function cancel() {
            $state.go('parking.providers-view');
        }

        function clearForm() {
            vm.providerName = '';
            vm.addressStreet = '';
            vm.addressNumber = '';
            vm.addressZipcode = '';
            vm.addressCity = '';
            vm.addressCountry = '';
        }

    }
})();