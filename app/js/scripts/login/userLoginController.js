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
                userId: vm.user.password,
                avatar: 'http://www.freelanceweb16.fr/wp-content/uploads/2015/08/Woman_Avatar.gif',
                userName: vm.user.username
            }

            // UserLoginService.loginUser(postData)
            //     .success(onPostSuccess)
            //     .error(onPostError);
        }

        vm.sendMessage = function(messages) {
            // AlerterService.success(messages);
            
            console.log(vm.messages);
        };

        vm.openChatRoom = function(roomId) {
            console.log("go to chat room " + roomId);
            vm.messages = getMessagesOfRoom(roomId);
        };


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

            var validNames = [

            ];

            vm.userInfo = {
            }
            
            vm.userInfoLioliou = {
                userId: '4562KDJYE72930DST283DFY202Gl',
                avatar: 'http://www.freelanceweb16.fr/wp-content/uploads/2015/08/Woman_Avatar.gif',
                userName: 'glioliou'
            };

            vm.userInfoLyrtzi = {
                userId: '4562KDJYE72930DST283DFY202Dl',
                avatar: 'http://www.freelanceweb16.fr/wp-content/uploads/2015/08/Woman_Avatar.gif',
                userName: 'dlyrtzi'
            }

            vm.messages = [];

            vm.user = {
                "username" : null,
                "password": null
            };

            vm.rooms = [
                {
                    "id" : 1,
                    "code" : "1",
                    "name" : "Λογιστική"
                },
                {
                    "id" : 2,
                    "code" : "2",
                    "name" : "Μισθοδοσία"
                },
                {
                    "id" : 3,
                    "code" : "3",
                    "name" : "Δημοτική Αστυνομία"
                },
                {
                    "id" : 4,
                    "code" : "4",
                    "name" : "YDATA"
                },
                {
                    "id" : 5,
                    "code" : "5",
                    "name" : "Πρωτόκολλο"
                }
            ];
        }

        var getMessagesOfRoom = function (roomId) {
            vm.roomId = roomId;
            return [{
                id: '535d625f898df4e80e2a125e',
                text: 'Fotzu isoko vo adget ne uba in lup jedzow mi uvinifse epepo het ezezocic bahehufep lid pubuj.',
                userId: 'topkas',
                userName: 'Jean',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                date: '1455110273886'
            }, {
                id: '535f13ffee3b2a68112b9fc0',
                text: 'Hu girucajam ifuolocag za nifjem ninze dak kadi wi zowolhim asa vouczu ci.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '1455110273886'
            }, {
                id: '546a5843fd4c5d581efa263a',
                text: 'Vad vo ujcofwag pelobhuz wonogmo cikutew imoissuv no doso jum govhi peva aj ven narzir gac rofbufubo il.',
                userId: 'topkas',
                userName: 'Jean',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                date: '1455110173886'
            }, {
                id: '54764399ab43d1d4113abfd1',
                text: 'Meug viedeloh cuwmaheba gunhe din mif kub ec limvimil boik fuj peze za sow.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '1455110283886'
            }, {
                id: '547643aeab43d1d4113abfd2',
                text: 'Leeczo gokurus cif wepke nidji dabuti wi itco aduzab anru cev do surakip.',
                userId: 'topkas',
                userName: 'Jean',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                date: '1455110483886'
            }, {
                id: '547815dbab43d1d4113abfef',
                text: 'Piazwac cah opovi cipril sonetpa da bobren teekiril fac ma attu wone piuba de ojeseki.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '1455110583886'
            }, {
                id: '547815dbaqsnod67892d4113abfef',
                text: 'Dubehtak re bodeju em parobji leunvil fetpok iwipog gibzi teb navibahul girofip hikfib ge.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '1455112283886'
            }]
        }

        init();
    }
})();