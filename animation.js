var animating = false;
var speed, now;
var speedInput = document.getElementById('speed');
var startButton = document.getElementById('start-animation');

var moveFeature = function(event) {
  var vectorContext = event.vectorContext;
  var frameState = event.frameState;
  if (animating) {
    var elapsedTime = frameState.time - now;
    var index = Math.round(speed * elapsedTime / 1000);
    relationIDs.forEach(function(relationID){
        var currentPoint = new ol.geom.Point(relationCoords[relationID][index]);
        var feature = new ol.Feature(currentPoint);
        vectorContext.drawFeature(feature, styles.geoMarker);
    });
  }
  map.render();
};
