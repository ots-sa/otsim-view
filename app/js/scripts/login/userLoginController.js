(function () {
    'use strict';

    angular
        .module('otsmi')
        .controller('CreateUserLoginController', CreateUserLoginController);

        CreateUserLoginController.inject = ['$scope', '$state', 'UserLoginService', 'AlerterService'];

    function CreateUserLoginController($scope, $state, UserLoginService, AlerterService) {

        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        var vm = this;

        function login() {

            UserLoginService.loginUser(postData)
                .success(onPostSuccess)
                .error(onPostError);
        }

        function onPostSuccess(result) {
            AlerterService.success('Login successful!', 5);
            // clearForm();
            // todo state go to dashboard
            $state.go('dashboard');
        }


        function onPostError(result) {
            AlerterService.danger('There was an error', 5);
            $state.reload();
        }

        function cancel() {
            $state.go('dashboard');
        }

        function clearForm() {
            vm.user = {};
        }

        var init = function() {
            vm.user = {
                "username" : null,
                "password": null
            }
        }

        init();
    }
})();