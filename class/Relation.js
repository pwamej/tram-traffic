class Relation{  
    constructor(relationID){
        var trackSource = new ol.source.Vector({
            url : 'http://ra.osmsurround.org/exportRelation/gpx?relationId=' + relationID,
            format : new ol.format.GPX()
        });
        var stopSource = new ol.source.Vector();
        
        this.id = relationID;
        this.trackLayer = new ol.layer.Vector({
            source : trackSource,
            //visible : false
        });
        this.stopLayer = new ol.layer.Vector({
            source : stopSource,
            visible : false
        });
        this.trackGeometry = null;
        
        var self=this;
        //setup track and stop geometries
        trackSource.once('addfeature', function(e){
            console.log('track loaded');
            //labelowanie danych aby umożliwić użycie getFeatureById
            trackSource.forEachFeature(function(f){
                f.setId(f.getProperties()['name']);
            });
            //w większości relacji 'Graph 1' zawiera geometrię trasy
            self.trackGeometry = trackSource.getFeatureById('Graph 1').getGeometry().getLineString(0);
            var featureID = 'Graph 1';
            //workaround gdy innny Graph zawiera geometrię trasy
            if(self.trackGeometry.getCoordinates().length<100){
                switch(relationID){
                    case '172973':
                        featureID = 'Graph 7';
                        break;
                    case '3147141':
                    case '3147263':
                        featureID = 'Graph 3';
                        break;
                    case '5700378':
                        featureID = 'Graph 4';
                        break;
                    default:
                        featureID = 'Graph 2';
                }
            }
            self.trackGeometry = trackSource.getFeatureById(featureID).getGeometry().getLineString(0);
            self.trackGeometry.set('layout','XY');
            stopSource.addFeatures(trackSource.getFeatures());
            stopSource.removeFeature(stopSource.getFeatureById(featureID)); //usuniecie trasy z source dla przystanków;
        });
    }     
}