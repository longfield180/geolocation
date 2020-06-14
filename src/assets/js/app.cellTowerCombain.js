app.controller('CellTowerCombainCtrl', function($scope) {
  $scope.url = 'https://cps.combain.com?key=jmfxzida7a0857qbgfg1';

  $scope.towers = {
    radioType: 'wcdma',
    "cellTowers":[{
      "id": 1,
      "mobileCountryCode": '',
      "mobileNetworkCode": '',
      "locationAreaCode": '',
      "cellId": '',
      "signalStrength": -70
    },{
      "id": 2,
      "mobileCountryCode": '',
      "mobileNetworkCode": '',
      "locationAreaCode": '',
      "cellId": '',
      "signalStrength": -70
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
      "mobileCountryCode": '',
      "mobileNetworkCode": '',
      "locationAreaCode": '',
      "cellId": '',
      "signalStrength": -70
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
    const cellTowers = parseCells($scope.towers)
    const towers = {
      radioType: $scope.towers.radioType,
      cellTowers
    }

    pointSearch(JSON.stringify(towers), $scope.url, 'combainCell');
  }
});

function parseCells(towers) {
  const { cellTowers } = towers;
  return cellTowers.map((cell) => {
    const {id, ...rest} = cell
    return rest;
  })
}