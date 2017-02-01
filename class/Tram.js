var STOPPED_TIME = 1000,
    VELOCITY = 5,
    STOP_THRESHOLD = 5;

var speedInput = document.getElementById('speed');
var daytimeInput = document.getElementById('daytime');
var dayInput = document.getElementById('day');

class Tram extends ol.Feature {
    constructor (relation, startTime){
        super({
            geometry : new ol.geom.Point(relation.trackGeometry.getCoordinateAt(0))
        });
        this.setStyle(styles.geoMarker);
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
    
    draw (vectorContext, frameState) {
        if (this.animating) {
            this.move(frameState);
        }
        vectorContext.drawFeature(this, this.getStyle());
    }
    
    move (frameState) {
         var elapsedTime = frameState.time - this.startTime - (this.passedStops * STOPPED_TIME),
             trackLength = this.relation.trackGeometry.getLength(),
             relativePosition = ((elapsedTime / 1000) / (trackLength / speedInput.value)),
             currentCoordinate = this.relation.trackGeometry.getCoordinateAt(relativePosition),
             closestStopFeature = this.stopLayer.getSource().getClosestFeatureToCoordinate(currentCoordinate),
             closestStopCoordinate = closestStopFeature.getGeometry().getClosestPoint(currentCoordinate),
             distance = this.calculateDistance(currentCoordinate,closestStopCoordinate);
        this.getGeometry().setCoordinates(currentCoordinate);
        if (distance < STOP_THRESHOLD) {
            this.stop (closestStopFeature)
        }    
    }  
    
    stop (stopFeature) {
        this.animating = false;
        this.stopLayer.getSource().removeFeature(stopFeature);
        this.passedStops = this.passedStops + 1;
        var self = this;
        setTimeout(function() {
            self.changeLoad();
            self.animating = true;
        }, STOPPED_TIME);
    }
    
    changeLoad () {
        var daytimeIndex = daytimeInput.value - 1,
            day = dayInput.value,
            keyString = this.relation.id+','+this.passedStops+','+day;
        console.log(keyString);
        this.load = load[keyString][daytimeIndex];
        this.changeColor(this.load);
        console.log('load: ' + this.load);
    } 
    
    changeColor (load) {
        var color = this.color(load),
            image = new ol.style.Circle({
                radius : 4,
                snapToPixel : false,
                fill : new ol.style.Fill({color: color}),
                stroke : new ol.style.Stroke({
                    color: 'black',
                    width: 1
                })
            });
        this.setStyle(new ol.style.Style({image : image}));
    }
    
    color (load) {
        if (load<10) {
            return 'blue';
        } else if (load<30) {
            return 'green';
        } else if (load<60) {
            return 'yellow';
        } else if (load<80) {
            return 'orange';
        } else {
            return 'red';
        }
    }
}