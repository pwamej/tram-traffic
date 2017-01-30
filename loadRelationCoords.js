var relationSources=[];
var stopSources=[];
//relationIDs - tablica zawierająca ID relacji
relationIDs.map(function(relationID){
    relationSources[relationID] = new ol.source.Vector({
        //wczytanie plików z trasami
        url : 'http://ra.osmsurround.org/exportRelation/gpx?relationId='+relationID,
        format : new ol.format.GPX()
    });
});
// routes - tablica asocjacyjna postaci {ID relacji : geometria relacji}
var relationGeometry=[];
relationIDs.forEach(function(relationID){
    relationSources[relationID].once('addfeature', function(e){
        console.log('xD');
        //labelowanie danych aby umożliwić użycie getFeatureById
        relationSources[relationID].forEachFeature(function(f){
            f.setId(f.getProperties()['name']);
        });
        //w większości relacji 'Graph 1' zawiera współrzędne trasy
        var relationLineString = relationSources[relationID].getFeatureById('Graph 1').getGeometry().getLineString(0);
        var featureID = 'Graph 1';
        if(relationLineString.getCoordinates().length<100){
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
            relationLineString = relationSources[relationID].getFeatureById(featureID).getGeometry().getLineString(0);


        }
        relationLineString.set('layout','XY');
        relationGeometry[relationID]=relationLineString;

        //przystanki
        stopSources[relationID]=new ol.source.Vector({
            features : relationSources[relationID].getFeatures(),
        });
        //console.log(stopSources[relationID].getFeatureById(featureID));
        stopSources[relationID].removeFeature(stopSources[relationID].getFeatureById(featureID)); //usuniecie trasy z source dla przystanków
        //relationLayers[relationID].setVisible(false);
    });
});
