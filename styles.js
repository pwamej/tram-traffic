var styles = {
  'geoMarker': new ol.style.Style({
    image: new ol.style.Circle({
      radius: 7,
      snapToPixel: false,
      fill: new ol.style.Fill({color: 'black'}),
      stroke: new ol.style.Stroke({
        color: 'white', width: 2
      })
    })
  })
};
