var STOPPED_TIME = 1000,
    SECONDS_PER_TRACK = 120,
    STOP_THRESHOLD = 5;

class Tram extends ol.Feature {
    constructor (relation, startTime){
        super({
            geometry : new ol.geom.Point(relation.trackGeometry.getCoordinateAt(0)),
            style : styles.geoMarker
        });
        console.log("new Tram");
        this.relation = relation;
        this.startTime = startTime;
        this.passedStops = 0;
        this.animating = true;
        this.load = 0;
        this.stopLayer = new ol.layer.Vector({
            source : new ol.source.Vector({
                features : relation.stopLayer.getSource().getFeatures()
            }),
            visible : false
        });
    }
    
    calculateDistance (a,b) {
        return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
    }
    
    stop (stopFeature) {
        console.log('stop'+stopFeature.getId());
        this.animating = false;
        this.stopLayer.getSource().removeFeature(stopFeature);
        this.passedStops = this.passedStops + 1;
        var self=this;
        setTimeout(function() {
            console.log('unstop');
            self.animating = true;
        }, STOPPED_TIME);
    }
    
    draw (vectorContext, frameState) {
        if (this.animating) {
            this.move(frameState);
        }
        console.log('draw'+this.animating);
        vectorContext.drawFeature(this, styles.geoMarker);
    }
    
    move (frameState) {
         var elapsedTime = frameState.time - this.startTime - (this.passedStops * STOPPED_TIME),
             relativePosition = ((elapsedTime / 1000) / SECONDS_PER_TRACK),
             currentCoordinate = this.relation.trackGeometry.getCoordinateAt(relativePosition),
             closestStopFeature = this.stopLayer.getSource().getClosestFeatureToCoordinate(currentCoordinate),
             closestStopCoordinate = closestStopFeature.getGeometry().getClosestPoint(currentCoordinate),
             distance = this.calculateDistance(currentCoordinate,closestStopCoordinate);
        this.getGeometry().setCoordinates(currentCoordinate);
        if (distance < STOP_THRESHOLD) {
            this.stop (closestStopFeature)
        }
        
    }
    
}