var myMap = L.map("map", {
  center: [
    39.7392, -104.9903
  ],
  zoom: 13,
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: api_key
}).addTo(myMap);


var neighborhoodShapes = "static/data/Denver_Statistical_Neighborhoods.geojson";
d3.json(neighborhoodShapes, function (data) {
  

 
  
  var denNeighborhoods = L.geoJSON(data, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3> Neighborhood: <hr>" + feature.properties.nbhd_name + "</h3>")
    }
  }).addTo(myMap)
});


var tree_data = ('static/data/tree_inventory.csv')
d3.csv(tree_data, function (trees) {  
    for (var i = 0; i < trees.length; i++) {
    latLong = []
    var lat = trees[i].Y_LAT
    var long = trees[i].X_LONG
    latLong.push(lat, long)
    
    
    var circle =L.circle(latLong, {
      fillOpacity: 0.75,
      color: "brown",
      fillColor: "brown",
      radius: 5
    }).addTo(myMap);
    
 
  }
});

