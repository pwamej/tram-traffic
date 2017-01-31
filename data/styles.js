var styles = {
    'geoMarker' : new ol.style.Style({
        image : new ol.style.Circle({
            radius : 4,
            snapToPixel : false,
            fill : new ol.style.Fill({color: 'black'}),
            stroke : new ol.style.Stroke({
                color: 'white',
                width: 2
            })
        }),
        //zIndex=0
    })
};
//console.log(styles.geoMarker.getZIndex());
