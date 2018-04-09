tilde.map = L.map('map');
tilde.employmentDomain = [0,7614660]
tilde.ai_riskDomain = [0.507867024,0.66,0.731438356]
tilde.colorRange = ["#87FF7B","#FF9300","#AD0012"]
tilde.radiusScale = d3.scale.linear().domain(tilde.employmentDomain).range([0,50000])
tilde.colorScale = d3.scale.linear().domain(tilde.ai_riskDomain).range(tilde.colorRange)

//mapbox.streets
//mapbox.light
L.tileLayer('https://api.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: '<b>Visualization and Map</b>: Frank Elavsky (NUIT) | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
  accessToken: 'pk.eyJ1IjoiZmVsYXZza3kiLCJhIjoiY2pmb3EwdjF3MHp4eTMybWR2aHVzNG1mOSJ9.QDrrYApB997cGXV7gnoNfQ'
}).addTo(tilde.map);
tilde.map.circleGroup = L.featureGroup().addTo(tilde.map);
tilde.map.markerGroup = L.layerGroup().addTo(tilde.map);

tilde.map.setView([39.8283, -98.5795], 4);

for (var num = 0; num < tilde.cities.length; num++) {
  var d = tilde.cities[num];
  var place_lat = d["Lat"];
  var place_long = d["Lng"];
  var e = d.e.toString()

  if (e.length >= 5) {
    e = e.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  d.e_display = e

  var circle = L.circle([place_lat, place_long], {
      color: tilde.colorScale(d.ai),
      stroke: false,
      fillOpacity:.9,
      data: d,
      radius: 314*Math.sqrt(tilde.radiusScale(d.e))
  }).addTo(tilde.map.circleGroup)
}
tilde.map.circleGroup.on('click',function(e){
  tilde.map.circleClick(e)
});

tilde.map.move = function(lat,lng) {
  tilde.map.flyTo([lat, lng],8);
}

tilde.map.mark = function(data) {
  tilde.map.markerGroup.clearLayers()
  tilde.marker = L.marker([data.Lat, data.Lng]).addTo(tilde.map.markerGroup)
  var popup_html = '<h3><b>' + data['Location'] + '</b></h3><p><b>Automation impact</b>: '+round(data.ai*100,2)+'%<br><b>Affected Employment</b>: '+data.e_display+'</p>';
  tilde.marker.bindPopup(popup_html);
  tilde.marker.openPopup()
}

tilde.map.circleClick = function(e) {
  tilde.current_selection = e.layer.options.data
  tilde.query.prepareData()
}