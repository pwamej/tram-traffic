var osm_layer = new ol.layer.Tile({ //map layer
  source: new ol.source.OSM() //download tiles from OSM
});


var map = new ol.Map({
  target: 'div_map', //attach map to div
  layers: [
    osm_layer
  ],

  view: new ol.View({
    center: ol.proj.fromLonLat([19.945, 50.0647]),
    zoom: 14
  })
});
