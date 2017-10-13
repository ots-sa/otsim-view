

angular.module('otsmi').controller('RoomChatComponentController',  [RoomChatComponentController]);
angular.module('otsmi').factory('RoomChatComponentService', [RoomChatComponentService]);

angular.module('otsmi').component('roomChat', {
    templateUrl: 'js/scripts/login/roomChatComponent.html',
    controller: RoomChatComponentController,
    controllerAs: 'vm',
    bindings : {
        userInfo: '=',
        changeUserFunction: '='
    }
});

function RoomChatComponentController(RoomChatComponentService) {

    var vm = this;

    // vm variables
    vm.messages = [];
    vm.roomId = null;

    vm.changeUserFunction = function() {
        vm.rooms = RoomChatComponentService.getRoomsOfUser(vm.userInfo.userId);
    }

    // vm functions
    vm.openChatRoom = function(roomId) {
        vm.roomId = roomId;
        vm.messages = RoomChatComponentService.getMessagesOfRoom(roomId);
    };

    vm.sendMessage = function(messages) {
        // AlerterService.success(messages);
        console.log(vm.messages);
    };
}

function RoomChatComponentService() {

    var srv = {};

    var configs = {
        'headers': {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json;charset=UTF-8',
            'Accept-Charset': 'UTF-8'
        }
    };

    srv.getRoomsOfUser = function(userId) {
        return [
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
    };

    srv.getMessagesOfRoom = function (roomId) {
        return [{
            id: '535d625f898df4e80e2a125e',
            text: 'Fotzu isoko vo adget ne uba in lup jedzow mi uvinifse epepo het ezezocic bahehufep lid pubuj.',
            userId: 'stopkaroglou',
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
            userId: 'stopkaroglou',
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
            userId: 'stopkaroglou',
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
    };

    return srv;
}