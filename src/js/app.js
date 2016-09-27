var app = angular.module('TransportationApp', []);


app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    var stopNames = [];

    function getStops() {
        $http.get('dist/gtfs/stops.json').then(function(results) {
            results.data.forEach(function(stop) {
                stopNames.push(stop.stop_name);
            });
        });
    }

    getStops();


    $scope.stopNames = stopNames;
    console.log($scope.stopNames);
}]);
