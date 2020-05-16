app.controller('UniwiredLabsCtrl', function($scope) {

  $scope.uniwiredPoints = [
    { "id": 1, "bssid": '', "signal": -70}, 
    { "id": 2, "bssid": '', "signal": -70}
  ]
  $scope.uniwiredIndex = $scope.uniwiredPoints.length;
  $scope.addNewPoint = function() {
    if($scope.uniwiredPoints.length>=5){
      alert("BSSID cannot be more than 5");
      return;
    }

    var newItemNo = ++$scope.uniwiredIndex;
    $scope.uniwiredPoints.push({
      "id": newItemNo,
      "bssid": '',
      "signal": -70
    });
  };

  $scope.removePoint = function(id) {
    if($scope.uniwiredPoints.length<=2){
      alert("BSSID cannot be less than 2");
      return;
    }

    var index = -1;
    var comArr = eval( $scope.uniwiredPoints );
    for( var i = 0; i < comArr.length; i++ ) {
      if( comArr[i].id === id) {
        index = i;
        break;
      }
    }

    if( index === -1 ) {
      alert( "Something gone wrong" );
    }

    $scope.uniwiredPoints.splice( index, 1 );
  };

  $scope.uniWiredSearch = function() {
    const bssid = $scope.uniwiredPoints.map(point => {
      delete point.id
      return point
    })

    const wapDetails = {
      token: '4d894c6002a8ad',
      "wifi": bssid,
      "address": 1
    }
    
    pointSearch(JSON.stringify(wapDetails), 'https://us1.unwiredlabs.com/v2/process.php', 'uniwired');
  }
});
