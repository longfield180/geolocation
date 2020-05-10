var status = false;
var gmarkers = [];

function geolocator(searchType, cells, cellsLength, waps) {

  let cellTowers = [];
  let checkLength = cellsLength
  const geolocatorUrl = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAyMdtbxfVibu7R03VicOXQOcudtmKYciU";

  if (cells) {
    cells.forEach(function (cell, index){

      const searchParams = JSON.stringify(cell);
      const xhr = new XMLHttpRequest();

      xhr.onload = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status != 200) {
          const data = JSON.parse(xhr.responseText);
          if (data.hasOwnProperty('error')) {
            // Reduce the length of the cell if there is an error
            checkLength = checkLength -1
            alert(`Error encountered - ${data.error.message}`);

            $('#cellSearch').modal('hide');
          }
        }

        // Add location data to the map
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          const data = JSON.parse(xhr.responseText);
          if (data.hasOwnProperty('location')) {
            // build triagulation metadata
            const cellDetails = {
              latitude: data.location.lat,
              longitude: data.location.lng,
              signalStrength: parseInt(cell.cellTowers[0].signalStrength),
              signalStrengthRatio: 1
            };

            cellTowers.push(cellDetails);

            placeMarker(data, cell, null, 'green');
            if (cellsLength > 1) {
              if (cellTowers.length === checkLength) {
                // Now you can triangulate
                setTimeout(triangulate(cellTowers), 3000);
              };
            }

            $('#cellSearch').modal('hide');

          }
        }
      }
      xhr.open("POST", geolocatorUrl, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(searchParams);
    });
  } else if (waps) {
    const searchParams = JSON.stringify(waps);
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status != 200) {
        const data = JSON.parse(xhr.responseText);
        if (data.hasOwnProperty('error')) {
          // Parse errors and display in a better format
          alert(data.error.message);
          $('#macSearch').modal('hide');
        }
      }

      // Add location data to the map
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if (data.hasOwnProperty('location')) {
          let searchMacs = ''
          waps.wifiAccessPoints.forEach(function(item) {
            searchMacs += item.macAddress+', ';
          })

          data.mac = searchMacs

          placeMarker(data, null, waps, 'blue');
          $('#macSearch').modal('hide');
        }
      }
    }
    xhr.open("POST", geolocatorUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(searchParams);
  }
}

function bssidSearch(macs) {
  removeMarkers();

  const bssid = parseString(macs).split(",")
  bssid.forEach(function(mac) {
    findWifi(mac, bssid)
  });
}

function findWifi(wifiBssid, bssid) {
  wifiBssid.split(";").slice(0, 20).forEach(function (name) {
    bssidOne = name.trim().split(",")[0];
      if (bssidOne.length >= 12) {
        $.getJSON("https://api.mylnikov.org/wifi?v=1.1&bssid=" + bssidOne + "&jsoncallback=?",
          { tags: "jquery", tagmode: "any", format: "json" },
          function (response) {
            if (response.result == 200) {
              const data = {
                accuracy: response.data.range,
                location: { lat: response.data.lat, lng: response.data.lon },
                mac: name
              }
              placeMarker(data, null, bssidOne, 'yellow');

              $('#wifiSearch').modal('hide');
            }
            if (response.result != 200) {
              alert(wifiBssid +" "+response.desc);
            }
        });
      } else {
        alert('Please enter MAC Address');
      }
  });
  return false;
}

function placeMarker(data, cell, waps, color) {

  const position = { lat: data.location.lat, lng: data.location.lng};
  let bounds = new google.maps.LatLngBounds();
  bounds.extend(position);
  const center = new google.maps.LatLng(data.location.lat, data.location.lng);

  let infoWindowContent = '<div class="info_content"><div class="row">';

  if (cell) {
    infoWindowContent += '<div class="col-md-6">' +
        '<p><b>MNC: </b>'+ cell.cellTowers[0].mobileNetworkCode +'</p>' +
        '<p><b>MCC: </b>'+ cell.cellTowers[0].mobileCountryCode +'</p>' +
        '<p><b>LAC: </b>'+ cell.cellTowers[0].locationAreaCode +'</p>' +
        '<p><b>CELL ID: </b>'+ cell.cellTowers[0].cellId +'</p>' +
        '</div>';
  } else if (waps){
    infoWindowContent += '<div class="col-md-6">' +
        '<p><b>MAC Address: </b>'+ data.mac +'</p>' +
        '</div>';
  }

  infoWindowContent +='<div class="col-md-6">' +
      '<p><b>Lat: </b>'+ data.location.lat +'</p>' +
      '<p><b>Lng: </b>'+ data.location.lng +'</p>' +
      '<p><b>Accuracy: </b>'+ data.accuracy || null +'</p>' +
      '</div>' +
      '</div></div>';

  // Display multiple markers on a map
  var infowindow = new google.maps.InfoWindow({
    content: infoWindowContent
  });

  const marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/"+color+"-dot.png"
    }
  });

  // Allow each marker to have an info window
  marker.addListener('click', function() {
    if(data.radius || data.accuracy) {
      let radius = parseInt(data.radius) || parseInt(data.accuracy)
      const circle = new google.maps.Circle({
        map: map,
        radius: radius,
        fillColor: '#313131',
        fillOpacity: .0375,
        strokeColor: '#fff',
        strokeOpacity: .8,
        strokeWeight: .8
      });

      circle.bindTo('center', marker, 'position');
      gmarkers.push(circle);
    }

    infowindow.open(map, marker);
    if (map.getZoom() < 13) {
      map.setZoom(13);
      map.setCenter(marker.getPosition());
    }
  });

  gmarkers.push(marker);
  map.fitBounds(bounds);

  var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
    this.setZoom(5);
    google.maps.event.removeListener(boundsListener);
  });
}

function removeMarkers() {
  for (i = 0; i < gmarkers.length; i++) {
    gmarkers[i].setMap(null);
  }
}

function triangulate(towers) {
  var totalSignalStrength = 0;
  for (var i = 0; i < towers.length; i++)
  totalSignalStrength += towers[i].signalStrength;

  for (var i = 0; i < towers.length; i++)
  towers[i].signalStrengthRatio = towers[i].signalStrength / totalSignalStrength;

  var clientLongitude = 0;
  for (var i = 0; i < towers.length; i++)
  clientLongitude += towers[i].longitude * towers[i].signalStrengthRatio;

  var clientLatitude = 0;
  for (var i = 0; i < towers.length; i++)
  clientLatitude += towers[i].latitude * towers[i].signalStrengthRatio;

  const data = {
    location: { lat: clientLatitude, lng: clientLongitude },
  };

  placeMarker(data, null, null, 'red');
  alert('Triagulation complete');
}

function numberParser(number) {
  const parsedNumber = parseInt(number)
  if (isNaN(parsedNumber)) {
    return false;
  } else {
    return parsedNumber
  }
}

function parseString(macs){
  let parsedMacs = '';
  let searchString = '';

  parsedMacs = macs.map(function(mac) {
    let string= mac.address
    return string;
  })

  searchString = parsedMacs.join(",");
  return searchString
}

// function combainSearch(waps) {
//   removeMarkers();

//   $.post(`https://cps.combain.com?key=jmfxzida7a0857qbgfg1`, { waps },
//     function(response, status) {
//       console.log(response);
//    });
// }

function pointSearch(waps, url, type) {
  removeMarkers();

  const parser = {
    uniwired: ((response, waps) => {
      const mac = JSON.parse(waps).wifi.map(point => {
        return point.bssid
      }).join(', ');

      if(response.status !== 'error') {
        const data = {
          accuracy: response.accuracy,
          location: { lat: response.lat, lng: response.lon },
          mac: name
        }
        placeMarker(data, null, bssid, 'yellow');
        return;
      }
      
      alert(response.message)
      
    }),

    combainCell: (args => {
      console.log(args)
    })
  }

  

  $.post(url, waps,
    function(response, status) {
      parser[type](response, waps)
   });
}