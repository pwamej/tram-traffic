var relationLayers = relationSources.map(function(relationSource){
    return new ol.layer.Vector({
        source : relationSource
    });
});

var osmLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var map = new ol.Map({
  target: 'map',
  layers: [
      osmLayer,
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([19.945, 50.0647]),
    zoom: 11
  })
});

relationLayers.map(function(relationLayer){
    map.addLayer(relationLayer);
});
