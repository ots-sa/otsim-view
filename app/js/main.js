/***
otsmi AngularJS App Main Script
***/

/* otsmi App */
angular.module("otsmi", [
    "ui.router",
    "ui.bootstrap",
    "pascalprecht.translate",
    "oc.lazyLoad",
    "ngSanitize",
    "angular-simple-chat"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
angular.module("otsmi").config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
angular.module("otsmi").config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
angular.module("otsmi").factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout',
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
angular.module("otsmi").controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function () {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header The controller has moved to a different file */

/* Setup Layout Part - Sidebar */
angular.module("otsmi").controller('SidebarController', ['$state', '$scope', function ($state, $scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initSidebar($state); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
angular.module("otsmi").controller('QuickSidebarController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        setTimeout(function () {
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
angular.module("otsmi").controller('ThemePanelController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
angular.module("otsmi").controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
    });
}]);

/**
 * Setup Rounting For Index Pages. Every applicaation module component will have its custom *.route.js file
 * according to johnpapa/angular-styleguide (https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).
 *  
 * For example if you want to examine or edit the routing of 'otsmi' module you will have to
 * look into 'otsmi.route.js' file
 */
angular.module("otsmi").config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $translateProvider, $locationProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard");

    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '.json'
    });

    // start with a specific language translation
    $translateProvider.preferredLanguage('el');
    // Enable escaping of HTML
    $translateProvider.useSanitizeValueStrategy('escape');

    // Enable HTML5 mode
    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });
    }

    $stateProvider

        // Login Page
        .state('login', {
            url: "/login",
            templateUrl: "js/scripts/login/userLogin.html",
            data: { pageTitle: 'Login | OTS MI' },
            controller: "CreateUserLoginController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'otsmi',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../node_modules/morris.js/morris.css',
                            '../node_modules/morris.js/morris.min.js',
                            '../node_modules/raphael/raphael.min.js',
                            '../node_modules/jquery-sparkline/jquery.sparkline.min.js',
                            '../assets/pages/scripts/dashboard.min.js',
                            'js/scripts/login/userLoginController.js',
                            'js/scripts/login/userLoginService.js',
                            'js/scripts/common/commonService.js',
                            'js/scripts/common/alerterService.js',
                        ]
                    });
                }]
            }
        })

        // Dashboard
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            data: { pageTitle: 'Parkalot | Dashboard' },
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'otsmi',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../node_modules/morris.js/morris.css',
                            '../node_modules/morris.js/morris.min.js',
                            '../node_modules/raphael/raphael.min.js',
                            '../node_modules/jquery-sparkline/jquery.sparkline.min.js',
                            '../assets/pages/scripts/dashboard.min.js',
                            'js/controllers/DashboardController.js'
                        ]
                    });
                }]
            }
        })

        // Blank Page
        .state('blank', {
            url: "/blank",
            templateUrl: "views/blank.html",
            data: { pageTitle: 'Blank Page Template' },
            controller: "BlankController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'otsmi',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'js/controllers/BlankController.js'
                        ]
                    });
                }]
            }
        })

        // AngularJS plugins
        .state('fileupload', {
            url: "/file_upload.html",
            templateUrl: "views/file_upload.html",
            data: { pageTitle: 'AngularJS File Upload' },
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'angularFileUpload',
                        files: [
                            '../node_modules/angular-file-upload/dist/angular-file-upload.min.js',
                        ]
                    }, {
                        name: 'otsmi',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // UI Select
        .state('uiselect', {
            url: "/ui_select.html",
            templateUrl: "views/ui_select.html",
            data: { pageTitle: 'AngularJS Ui Select' },
            controller: "UISelectController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'ui.select',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '../node_modules/ui-select/dist/select.min.css',
                            '../node_modules/ui-select/dist/select.min.js'
                        ]
                    }, {
                        name: 'otsmi',
                        files: [
                            'js/controllers/UISelectController.js'
                        ]
                    }]);
                }]
            }
        })

        // UI Bootstrap
        .state('uibootstrap', {
            url: "/ui_bootstrap.html",
            templateUrl: "views/ui_bootstrap.html",
            data: { pageTitle: 'AngularJS UI Bootstrap' },
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'otsmi',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Tree View
        .state('tree', {
            url: "/tree",
            templateUrl: "views/tree.html",
            data: { pageTitle: 'jQuery Tree View' },
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'otsmi',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '../node_modules/jstree/dist/themes/default/style.min.css',

                            '../node_modules/jstree/dist/jstree.min.js',
                            '../assets/pages/scripts/ui-tree.min.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // User Profile
        .state("profile", {
            url: "/profile",
            templateUrl: "views/profile/main.html",
            data: { pageTitle: 'User Profile' },
            controller: "UserProfileController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'otsmi',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '../node_modules/bootstrap-fileinput/css/fileinput.css',
                            '../assets/pages/css/profile.css',

                            '../node_modules/jquery-sparkline/jquery.sparkline.min.js',
                            '../node_modules/bootstrap-fileinput/js/fileinput.js',

                            '../assets/pages/scripts/profile.min.js',

                            'js/controllers/UserProfileController.js'
                        ]
                    });
                }]
            }
        })

        // User Profile Dashboard
        .state("profile.dashboard", {
            url: "/dashboard",
            templateUrl: "views/profile/dashboard.html",
            data: { pageTitle: 'User Profile' }
        })

        // User Profile Account
        .state("profile.account", {
            url: "/account",
            templateUrl: "views/profile/account.html",
            data: { pageTitle: 'User Account' }
        })

        // User Profile Help
        .state("profile.help", {
            url: "/help",
            templateUrl: "views/profile/help.html",
            data: { pageTitle: 'User Help' }
        })

        // Todo
        .state('todo', {
            url: "/todo",
            templateUrl: "views/todo.html",
            data: { pageTitle: 'Todo' },
            controller: "TodoController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'otsmi',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css',
                            '../assets/apps/css/todo-2.css',
                            '../node_modules/select2/dist/css/select2.min.css',
                            '../node_modules/select2-bootstrap-css/select2-bootstrap.min.css',

                            '../node_modules/select2/dist/js/select2.full.min.js',

                            '../node_modules/bootstrap-datepicker/js/bootstrap-datepicker.js',

                            '../assets/apps/scripts/todo-2.min.js',

                            'js/controllers/TodoController.js'
                        ]
                    });
                }]
            }
        })

}]);

/* Init global settings and run the app */
angular.module("otsmi").run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);