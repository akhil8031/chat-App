var chatApp = angular.module('chatApp', []);

chatApp.controller('userCtrl', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
}]);