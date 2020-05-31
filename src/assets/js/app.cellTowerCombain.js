app.controller('CellTowerCombainCtrl', function($scope) {

  $scope.towers = {
    radioType: '',
    "cellTowers":[{
      "id": 1,
      "mobileCountryCode": 240,
      "mobileNetworkCode": 5,
      "locationAreaCode": 25,
      "cellId": 1662835,
      "signalStrength": -64
    },{
      "id": 2,
      "mobileCountryCode": 240,
      "mobileNetworkCode": 5,
      "locationAreaCode": 25,
      "cellId": 1639963,
      "signalStrength": -80
    }]
  };

  $scope.index = $scope.towers.cellTowers.length;

  $scope.addNewCell = function() {
    if($scope.towers.cellTowers.length>=5){
      alert("Cell towers cannot be more than 5");
      return;
    }

    var newItemNo = ++$scope.index;
    $scope.towers.cellTowers.push({
      "id": newItemNo,
      "cellId": '',
      "mobileCountryCode": 240,
      "mobileNetworkCode": 5,
      "locationAreaCode": 25,
      "cellId": 1639963,
      "signalStrength": -80
    });
  };
  $scope.removeCell = function(id) {
    if($scope.towers.cellTowers.length<=1){
      alert("Cell towers cannot be less than 1");
      return;
    }

    var index = -1;
    var comArr = eval( $scope.towers.cellTowers );
    for( var i = 0; i < comArr.length; i++ ) {
      if( comArr[i].id === id) {
        index = i;
        break;
      }
    }

    if( index === -1 ) {
    	alert( "Something gone wrong" );
    }

    $scope.towers.cellTowers.splice( index, 1 );
  };
  $scope.cellTowerSearch = function() {

    console.log($scope.towers.cellTowers);
    removeMarkers();
    // pointSearch(JSON.stringify($scope.towers.cellTowers), 'https://cps.combain.com?key=jmfxzida7a0857qbgfg1', 'combainCell');
  }


});