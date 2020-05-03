var map;

function initMap() {
  let center = new google.maps.LatLng(0.0, 0.0);
  const myOptions = {
      zoom: 13,
      streetViewControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      mapTypeControl: true,

      mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT
      },
      zoomControl: true,
      zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.RIGHT_CENTER
      },
      scaleControl: true,
      streetViewControl: false
  };

  map = new google.maps.Map(document.getElementById('map'), myOptions);
  map.setZoom(2);
  // map.setTilt(50); What does this do?

  center = new google.maps.LatLng(0.0, 0.0);
  map.setCenter(center);
}