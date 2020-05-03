// var env = {};

// // Import variables if present (from env.js)
// if(window){  
//   Object.assign(env, window.__env);
// }

// var app = angular.module('geolocation', []);
// var map;
// var status = false;
// var gmarkers = [];

// // Register environment in AngularJS as constant
// app.constant('__env', env);

app.controller('CombainCtrl', function($scope) {

  $scope.combainPoints = [{ "id": 1, "macAddress": '', "signalStrength": -70}]
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
    if($scope.combainPoints.length<=1){
      alert("MAC address cannot be less than 1");
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
    const wapDetails = {
      "wifiAccessPoints": $scope.combainPoints
    }
    combainSearch(wapDetails);
  }
});


