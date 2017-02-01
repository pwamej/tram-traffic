var styles = {
    'geoMarker' : new ol.style.Style({
        image : new ol.style.Circle({
            radius : 4,
            snapToPixel : false,
            fill : new ol.style.Fill({color: 'blue'}),
            stroke : new ol.style.Stroke({
                color: 'black',
                width: 1
            })
        }),
        //zIndex=0
    })
};
//console.log(styles.geoMarker.getZIndex());
