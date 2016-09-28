var app = angular.module('TransportationApp', []);


app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    var stops = [];
    var stopTimes = [];

    //Gets stops from stops.json
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

    //gets stop time info form stop_time.json
    function getStopTimes() {
        $http.get('dist/data/stop_times.json').then(function(results) {
            results.data.forEach(function(stopTimeInfo) {
                stopTimes.push(stopTimeInfo);
            });
        });
    }

    //uses the departure station stop_id to get stop_time info
    function getDepartInfo(stop_id) {
        var stopLoop = false;
        $scope.stopTimes.forEach(function(stopTimeInfo) {
            if (stopTimeInfo.stop_id == stop_id && typeof(stopTimeInfo.trip_id) == 'number' && !stopLoop) {
                getStopsForDeparture(stopTimeInfo.trip_id);
                stopLoop = true; //stops loop to only get one entry may need to change this
            }
        });
    }

    //sets available arrival stations based on selected departure station
    function getStopsForDeparture(trip_id) {
        $scope.arrivalStations = [];
        stopTimes.forEach(function(stopTimeInfo) {
            if (trip_id == stopTimeInfo.trip_id) {
                $scope.stops.forEach(function(stop) {
                    if (stop.stop_id == stopTimeInfo.stop_id) {
                        $scope.arrivalStations.push(stop.stop_name);
                    }
                });
            }
        });
    }

    //sets departure/arrival stop_id based on selected name
    $scope.setStopID = function(position) {
        if (position == 'arrival') {
            var arrivalStopID;
            $scope.stops.forEach(function(stop) {
                if (stop.stop_name == $scope.arrivalStation) {
                    arrivalStopID = stop.stop_id;
                }
            });
            //TODO:getArrivalInfo(arrivalStopID);
        } else {
            var departureStopID;
            $scope.stops.forEach(function(stop) {
                if (stop.stop_name == $scope.departureStation) {
                    departureStopID = stop.stop_id;
                }
            });
            getDepartInfo(departureStopID);
        }
    };

    $scope.stops = stops;
    $scope.stopTimes = stopTimes;

    getStops();
    getStopTimes();
}]);
