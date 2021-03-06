tilde.map = L.map('map');
tilde.map.scrollWheelZoom.disable()
tilde.employmentDomain = [0,7614660]
tilde.ai_riskDomain = [0.507867024,0.66,0.731438356]
tilde.colorRange = ["#87FF7B","#FF9300","#AD0012"]
tilde.radiusScale = d3.scale.linear().domain(tilde.employmentDomain).range([1000,60000])
tilde.colorScale = d3.scale.linear().domain(tilde.ai_riskDomain).range(tilde.colorRange)
tilde.token = 'pk.eyJ1Ijoia2VsbG9nZ2luc2lnaHQiLCJhIjoiY2poMmRyYTBlMDNpNjJxcGR0ZWQzN2ZpbyJ9.P2iJTWi-a-cf5tJ0m7520A'

tilde.map.circleGroup = L.featureGroup().addTo(tilde.map);
tilde.map.markerGroup = L.layerGroup().addTo(tilde.map);
tilde.map.setView([39.8283, -98.5795], 3);

tilde.gl = L.mapboxGL({
    style: 'mapbox://styles/felavsky/cjh10iif904ai2sk5xfxgfqjv',
    accessToken: tilde.token,
    attribution: 'Style: <a href="https://twitter.com/rasagy">@rasagy</a> | &copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> | <a href="https://www.mapbox.com/map-feedback/"><b>Improve this map</b></a>'
}).addTo(tilde.map);

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
      fillOpacity:.95,
      data: d,
      radius: 314*Math.sqrt(tilde.radiusScale(d.e))
  }).addTo(tilde.map.circleGroup)
}
tilde.circles = d3.selectAll('.leaflet-interactive').style('mix-blend-mode','screen')

tilde.map.on('zoomend', function() {
  if (tilde.map.getZoom() > 11) {
    tilde.circles
      .transition()
      .duration(900)
      .style('opacity','0')
  } else if (tilde.map.getZoom() > 8) {
    tilde.circles
      .transition()
      .duration(900)
      .style('opacity','0.3')
  } else {
    tilde.circles
      .style('opacity','0.95')
  }
})

tilde.map.circleGroup.on('click',function(e){
  tilde.map.circleClick(e)
});

tilde.map.move = function() {
  var data = tilde.current_selection;
  tilde.map.flyTo([data.Lat, data.Lng],8);
}

tilde.map.mark = function() {
  var data = tilde.current_selection;
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