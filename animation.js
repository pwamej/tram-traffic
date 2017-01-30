var animating = false;
var speed, now;
var stopThreshold = 5;

var calculateDistance = function (a,b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

var moveFeature = function (event) {
    var vectorContext = event.vectorContext,
        frameState = event.frameState,
        elapsedTime = frameState.time - now,
        fraction = ((elapsedTime / 1000) / 120);
    if (animating) {
        //relationIDs.forEach(function (relationID) {
            var relationID='176851', 
                stoppedTramFeature,
                currentCoordinate = relationGeometry[relationID].getCoordinateAt(fraction),
                closestStopFeature = stopSources[relationID].getClosestFeatureToCoordinate(currentCoordinate),
                closestStopCoordinate = closestStopFeature.getGeometry().getClosestPoint(currentCoordinate),
                distance = calculateDistance(currentCoordinate,closestStopCoordinate),
                currentPoint = new ol.geom.Point(currentCoordinate),
                feature = new ol.Feature(currentPoint);
            if (distance < stopThreshold && elapsedTime>2000){
                animating = false;
                stopSources[relationID].removeFeature(closestStopFeature);
                now+=1000;
                feature.setStyle(styles.geoMarker);
                relationSources[relationID].addFeature(feature);
                stoppedTramFeature=feature;
                setTimeout(function() {
                    animating = true;
                    relationSources[relationID].removeFeature(stoppedTramFeature);
                }, 1000);
                
            }
            vectorContext.drawFeature(feature, styles.geoMarker);
        //});
    }
    map.render();
};
