app.controller('CombainCtrl', function($scope, $http) {
  $scope.method = 'POST';
  $scope.url = 'https://cps.combain.com?key=jmfxzida7a0857qbgfg1';

  $scope.combainPoints = [
    { "id": 1, "macAddress": '', "signalStrength": -70},
    { "id": 2, "macAddress": '', "signalStrength": -70}
  ]
  $scope.combainIndex = $scope.combainPoints.length;
  $scope.addNewWIFI = function() {
    if($scope.combainPoints.length>=5){
      alert("MAC address cannot be more than 5");
      return;
    }

    var newItemNo = ++$scope.combainIndex;
    $scope.combainPoints.push({
      "id": newItemNo,
      "macAddress": '',
      "signalStrength": -70
    });
  };

  $scope.removeWIFI = function(id) {
    if($scope.combainPoints.length<=2){
      alert("MAC address cannot be less than 2");
      return;
    }

    var index = -1;
    var comArr = eval( $scope.combainPoints );
    for( var i = 0; i < comArr.length; i++ ) {
      if( comArr[i].id === id) {
        index = i;
        break;
      }
    }

    if( index === -1 ) {
      alert( "Something gone wrong" );
    }

    $scope.combainPoints.splice( index, 1 );
  };

  $scope.ComabinSearch = function() {
    const points = parsePoints($scope.combainPoints)
    const wapDetails = {
      "wifiAccessPoints": points
    }

    // axios.post($scope.url, wapDetails, options)
    // .then((res) => {
    //   alert(res)
    // })
    // .catch((err) => {
    //   alert(err.message)
    // })

    pointSearch(wapDetails, 'https://cps.combain.com?key=jmfxzida7a0857qbgfg1', 'combain');
  }
});

function parsePoints(points) {
  return points.map((point) => {
    const {id, ...rest} = point
    return rest;
  })
}

// date: Sun, 31 May 2020 09:57:14 GMT
// content-type: application/json; charset=UTF-8
// content-length: 58
// server: Apache/2.4.39 (Amazon) OpenSSL/1.0.2k-fips PHP/7.0.33
// x-powered-by: PHP/7.0.33
// access-control-allow-headers: Content-Type
// access-control-allow-methods: OPTIONS, GET, POST
// access-control-allow-origin: *
// cache-control: no-cache
