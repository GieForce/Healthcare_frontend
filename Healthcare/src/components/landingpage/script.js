function myMap() {
  let myCenter = new google.maps.LatLng(52.722306, 6.465789);
  let mapCanvas = document.getElementById("map");
  let mapOptions = {center: myCenter, zoom: 15};
  let map = new google.maps.Map(mapCanvas, mapOptions);
  let marker = new google.maps.Marker({position:myCenter});
    marker.setMap(map);
}
