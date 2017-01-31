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

var relations = relationIDs.map(function (relationID) {
    return new Relation(relationID);
})
//var relations = [];
//relations[0] = new Relation(relationIDs[0]);

relations.map(function (relation) {
    map.addLayer(relation.trackLayer)
});