
/* Setup Layout Part - Header */
(function () {
    'use strict';

    angular
        .module('otsmi')
        .controller('HeaderController', HeaderController);

    HeaderController.inject = ['$scope'];
    function HeaderController($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() {

            $scope.$on('$includeContentLoaded', function () {
                Layout.initHeader(); // init header
            });
        }


    }
})();