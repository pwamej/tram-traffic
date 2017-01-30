var osmLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var map = new ol.Map({
    target: 'map',
    layers: [
        osmLayer
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([19.945, 50.0647]),
        zoom: 11
    })
});

var relationLayers=[];
relationIDs.map(function(relationID){
    relationLayers[relationID] = new ol.layer.Vector({
        source : relationSources[relationID],
//        visible : false
    });
});

relationLayers.map(function (relationLayer) {
    map.addLayer(relationLayer);
});

var stopLayers=[];
relationIDs.map(function(relationID){
    stopLayers[relationID] = new ol.layer.Vector({
        source : stopSources[relationID],
//        visible : false
    });
});

stopLayers.map(function (stopLayer) {
    map.addLayer(stopLayer);
});