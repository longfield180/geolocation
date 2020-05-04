app.controller('GoogleCoordCtrl', function($scope) {
  const defaultPoint = {
    "details": '',
    "radius": ''
  }

  $scope.coord = defaultPoint;
  $scope.placeCoordinates = function(coord) {
    const coords = $scope.coord.details.split(",");

    if ($scope.coord.details && $scope.coord.radius) {
      const data = {
        accuracy: null,
        radius: $scope.coord.radius,
        location: { lat: parseFloat(coords[0]), lng: parseFloat(coords[1]) }
      }

      placeMarker(data, null, null, 'pink');
      $('#enterCoordinates').modal('hide');

    } else {
      alert ('All fields are required');
    }
  }
});


