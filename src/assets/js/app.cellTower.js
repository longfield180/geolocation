app.controller('CellTowerCtrl', function($scope) {
  $scope.cells = [{
    "id": 1,
    "cellTowers": [{
      "cellId": '',
      "locationAreaCode": '',
      "mobileCountryCode": '',
      "mobileNetworkCode": '',
      "signalStrength": ''
    }]
  }];

  $scope.index = $scope.cells.length;

  $scope.addNewCell = function() {
    if($scope.cells.length>=5){
      alert("Cell towers cannot be more than 5");
      return;
    }

    var newItemNo = ++$scope.index;
    $scope.cells.push({
      "id": newItemNo,
      "cellTowers": [{
        "cellId": '',
        "locationAreaCode": '',
        "mobileCountryCode": '',
        "mobileNetworkCode": '',
        "signalStrength": ''
      }]
    });
  };
  $scope.removeCell = function(id) {
    if($scope.cells.length<=1){
      alert("Cell towers cannot be less than 1");
      return;
    }

    var index = -1;
    var comArr = eval( $scope.cells );
    for( var i = 0; i < comArr.length; i++ ) {
      if( comArr[i].id === id) {
        index = i;
        break;
      }
    }

    if( index === -1 ) {
    	alert( "Something gone wrong" );
    }

    $scope.cells.splice( index, 1 );
  };
  $scope.cellTowerSearch = function() {
    console.log($scope.cells);
    removeMarkers();
    geolocator('cells', $scope.cells, $scope.cells.length);
  }


});