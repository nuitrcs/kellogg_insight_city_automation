tilde.map = L.map('map');
tilde.employmentDomain = [0,7614660]
tilde.ai_riskDomain = [0.507867024,0.56,0.59,0.731438356]
tilde.colorRange = ["#7AFF65","#FF8118","#FF9300","#CA002B"]
tilde.radiusScale = d3.scale.linear().domain(tilde.employmentDomain).range([0,50000])
tilde.colorScale = d3.scale.linear().domain(tilde.ai_riskDomain).range(tilde.colorRange)

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '<b>Visualization and Map</b>: Frank Elavsky (NUIT) | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(tilde.map);
tilde.map.circleGroup = L.featureGroup().addTo(tilde.map);
tilde.map.markerGroup = L.layerGroup().addTo(tilde.map);

tilde.map.setView([39.8283, -98.5795], 4);

for (var num = 0; num < tilde.cities.length; num++) {
  var d = tilde.cities[num];
  var place_lat = d["Lat"];
  var place_long = d["Lng"];

  var circle = L.circle([place_lat, place_long], {
      color: tilde.colorScale(d.ai),
      stroke: false,
      fillOpacity:.8,
      data: d,
      radius: 314*Math.sqrt(tilde.radiusScale(d.e))
  }).addTo(tilde.map.circleGroup)
}
tilde.map.circleGroup.on('click',function(e){
  tilde.map.circleClick(e)
});

var myIcon = L.icon({
  iconUrl: 'https://cldup.com/jsXu-OReqo-3000x3000.png',
  iconSize: [50,50],
  iconAnchor: [24,50],
  popupAnchor: [1,-50]
});

tilde.map.move = function(lat,lng) {
  tilde.map.flyTo([lat, lng],8);
}

tilde.map.mark = function(data) {
  tilde.map.markerGroup.clearLayers()
  tilde.marker = L.marker([data.Lat, data.Lng]).addTo(tilde.map.markerGroup)
  var popup_html = '<h3>' + data['Location'] + '</h3>';
  tilde.marker.bindPopup(popup_html);
}

tilde.map.circleClick = function(e) {
  tilde.current_selection = e.layer.options.data
  tilde.query.prepareData()
}