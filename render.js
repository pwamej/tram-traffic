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

var vectorSource = new ol.source.Vector({
        url: 'http://localhost:80/relation_176851.gpx',
        format: new ol.format.GPX()
    });

var tramMarker = new ol.Feature({
    type : 'geoMarker'
});

var routeCoords,routeLength;
var listenerKey = vectorSource.once('change', function(e) {
  if (vectorSource.getState() == 'ready') {
      vectorSource.forEachFeature(function(f){
          f.setId(f.getProperties()['name']);
      });
      var route = vectorSource.getFeatureById('Graph 1').getGeometry();
      routeCoords = route.getCoordinates()[0].map(a => a.slice(0,2));
      var routeLength = routeCoords.length;
      tramMarker.setGeometry(new ol.geom.Point(routeCoords[0]));
      console.log(routeCoords[0]);
      var temp=vectorLayer.getSource().addFeature(tramMarker);
      vectorLayer.setSource(temp);
      map.render();
      //ol.Observable.unByKey(listenerKey);
  }
});

var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: function(feature) {
    // hide geoMarker if animation is active
    if (animating && feature.get('type') === 'geoMarker') {
      return null;
    }
    return styles[feature.get('type')];
  }
});



var osmLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var map = new ol.Map({
  target: 'map',
  layers: [
      osmLayer,
      vectorLayer
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([19.945, 50.0647]),
    zoom: 11
  })
});
var animating = false;
var speed, now;
var speedInput = document.getElementById('speed');
var startButton = document.getElementById('start-animation');

var moveFeature = function(event) {
  var vectorContext = event.vectorContext;
  var frameState = event.frameState;

  if (animating) {
    var elapsedTime = frameState.time - now;
    // here the trick to increase speed is to jump some indexes
    // on lineString coordinates
    var index = Math.round(speed * elapsedTime / 1000);

    if (index >= routeLength) {
      stopAnimation(true);
      return;
    }

    var currentPoint = new ol.geom.Point(routeCoords[index]);
    var feature = new ol.Feature(currentPoint);
    vectorContext.drawFeature(feature, styles.geoMarker);
  }
  // tell OL3 to continue the postcompose animation
  map.render();
};

function startAnimation() {
  if (animating) {
    stopAnimation(false);
  } else {
    animating = true;
    now = new Date().getTime();
    speed = speedInput.value;
    startButton.textContent = 'Cancel Animation';
    // hide geoMarker
    tramMarker.setStyle(null);
    // just in case you pan somewhere else
    map.on('postcompose', moveFeature);
    map.render();
  }
}


/**
 * @param {boolean} ended end of animation.
 */
function stopAnimation(ended) {
  animating = false;
  startButton.textContent = 'Start Animation';

  // if animation cancelled set the marker at the beginning
  var coord = ended ? routeCoords[routeLength - 1] : routeCoords[0];
  /** @type {ol.geom.Point} */ (tramMarker.getGeometry())
    .setCoordinates(coord);
  //remove listener
  map.un('postcompose', moveFeature);
}

startButton.addEventListener('click', startAnimation, false);
