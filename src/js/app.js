var app = angular.module('TransportationApp', []);


app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    var stops = [];

    function getStops() {
        var tempID = "";
        $http.get('dist/data/stops.json').then(function(results) {
            results.data.forEach(function(stop) {
                if (tempID != stop.zone_id) {
                    stops.push(stop);
                    tempID = stop.zone_id;
                }
            });
        });
    }

    getStops();

    $scope.setDeparture = function() {
        console.log($scope.departureStation);
    };

    $scope.stops = stops;
}]);
