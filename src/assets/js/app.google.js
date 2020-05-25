app.controller('GoogleWapCtrl', function($scope) {
    // Build WAP JSON for Google Search
    $scope.waps = [
      { "id": 1, "macAddress": '', "signalStrength": -70},
      { "id": 2, "macAddress": '', "signalStrength": -70}
    ];
    $scope.wapIndex = $scope.waps.length;
    $scope.addNewWap = function() {
      if($scope.waps.length>=5){
        alert("MAC address cannot be more than 5");
        return;
      }
  
      var newItemNo = ++$scope.wapIndex;
      $scope.waps.push({
        "id": newItemNo,
        "macAddress": '',
        "signalStrength": -70
      });
    };
    $scope.removeWap = function(id) {
      if($scope.waps.length<=2){
        alert("MAC address cannot be less than 2");
        return;
      }
  
      var index = -1;
      var comArr = eval( $scope.waps );
      for( var i = 0; i < comArr.length; i++ ) {
        if( comArr[i].id === id) {
          index = i;
          break;
        }
      }
  
      if( index === -1 ) {
        alert( "Something gone wrong" );
      }
  
      $scope.waps.splice( index, 1 );
    };
    $scope.wapSearch = function() {
      const wapDetails = {
        "considerIp": "false",
        "wifiAccessPoints": $scope.waps
      }
      geolocator('waps', null, null, wapDetails);
    }
});