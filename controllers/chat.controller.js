var chatApp = angular.module('chatApp', []);

chatApp.controller('chatCtrl', ['$scope', function($scope) {
    var socket = io.connect();
    this.message = undefined;
    $scope.msgs = [];

    this.sendMsg = function() {
        console.log('i am sending');
        socket.emit('send message', $scope.message);
        $scope.message = undefined;
    }

    socket.on('new message', function(data) {
        console.log($scope.msgs);
        $scope.msgs.push(data);
        $scope.$apply();
    });
}]);