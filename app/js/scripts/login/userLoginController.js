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

        vm.login = function() {

            vm.userInfo = {
                userId: vm.user.username,
                avatar: 'http://www.freelanceweb16.fr/wp-content/uploads/2015/08/Woman_Avatar.gif',
                userName: vm.user.username
            }

            vm.changeUserFunction();
            // UserLoginService.loginUser(postData)
            //     .success(onPostSuccess)
            //     .error(onPostError);
        }

        function onPostSuccess(result) {
            AlerterService.success('Login successful!', 5);
            // todo state go to dashboard
            // $state.go('dashboard');
        }


        function onPostError(result) {
            AlerterService.danger('There was an error', 5);
            $state.reload();
        }

        var init = function() {

            var validNames = [

            ];

            vm.userInfo = {
                userId: null
            };
        
            vm.user = {
                "username" : null,
                "password": null
            };
        }

        init();
    }
})();