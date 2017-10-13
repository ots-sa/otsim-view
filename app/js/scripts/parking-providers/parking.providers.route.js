/**
 * 'parkalot.parking.providers' module declaration
 */
angular.module("parkalot.parking.providers", []);

/**
 * 'parkalot.parking.providers' module routing.
 */
angular.module("parkalot.parking.providers").config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $translateProvider, $locationProvider) {

    $stateProvider
        .state('parking', {
            url: '/parking',
            // Note: abstract still needs a ui-view for its children to populate.
            // You can simply add it inline here.
            template: '<ui-view/>',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'parkalot',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'js/scripts/common/commonService.js',
                            'js/scripts/common/alerterService.js'
                        ]
                    });
                }]
            }
        })

        // Parking Providers list page
        .state("parking.providers-view", {
            url: "/providers",
            templateUrl: "js/scripts/parking-providers/viewParkingProviders.html",
            data: { pageTitle: 'Parking Providers' },
            controller: "ViewParkingProvidersController",
            controllerAs: 'vm',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'parkalot',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'js/scripts/parking-providers/parkingProviderService.js',
                            'js/scripts/parking-providers/viewParkingProvidersController.js'
                        ]
                    });
                }]
            }
        })

        // Create new Parking Provider page
        .state("parking.providers-create", {
            url: "/providers/create",
            templateUrl: "js/scripts/parking-providers/createParkingProvider.html",
            data: { pageTitle: 'Create new Parking Provider' },
            controller: "CreateParkingProviderController",
            controllerAs: 'vm',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'parkalot',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'js/scripts/parking-providers/parkingProviderService.js',
                            'js/scripts/parking-providers/createParkingProviderController.js'
                        ]
                    });
                }]
            }
        })

}]);
