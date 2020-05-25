app.controller('MyLinkovCtrl', function($scope) {
  $scope.macs = [{ "id": 1, "address": '', "signalStrength": -70}]
  $scope.macsIndex = $scope.macs.length;
  $scope.addNewMac = function() {
    if($scope.macs.length>=5){
      alert("MAC address cannot be more than 5");
      return;
    }

    var newItemNo = ++$scope.macsIndex;
    $scope.macs.push({
      "id": newItemNo,
      "address": '',
      "signalStrength": -70
    });
  };
  $scope.removeMac = function(id) {
    if($scope.macs.length<=1){
      alert("MAC address cannot be less than 1");
      return;
    }

    var index = -1;
    var comArr = eval( $scope.macs );
    for( var i = 0; i < comArr.length; i++ ) {
      if( comArr[i].id === id) {
        index = i;
        break;
      }
    }

    if( index === -1 ) {
      alert( "Something gone wrong" );
    }

    $scope.macs.splice( index, 1 );
  };
  $scope.macSearch = function() {
    bssidSearch($scope.macs, $scope.macsIndex);
  }
});