var relationSources=[];
//relationIDs - tablica zawierająca ID relacji
relationIDs.map(function(relationID){
    relationSources[relationID] = new ol.source.Vector({
        //wczytanie plików z trasami
        url : 'http://ra.osmsurround.org/exportRelation/gpx?relationId='+relationID,
        format : new ol.format.GPX()
    });
});
// relationCoords - tablica asocjacyjna postaci {ID relacji : tablica współrzędnych}
var relationCoords=[];
relationIDs.forEach(function(relationID){
    relationSources[relationID].once('addfeature', function(e){
        //labelowanie danych aby umożliwić użycie getFeatuereById
        relationSources[relationID].forEachFeature(function(f){
            f.setId(f.getProperties()['name']);
        });
        //w większości relacji 'Graph 1' zawiera współrzędne trasy
        var route = relationSources[relationID].getFeatureById('Graph 1').getGeometry();
        //uzyskanie tablicy współrzędnych
        relationCoords[relationID] = route.getCoordinates()[0].map(a => a.slice(0,2));
        //workaround dla pozostałych relacji
        if(relationCoords[relationID].length<100){
            var featureID;
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
            route = relationSources[relationID].getFeatureById(featureID).getGeometry();
            relationCoords[relationID] = route.getCoordinates()[0].map(a => a.slice(0,2));
        }
        if(relationID=='1175384') relationCoords['1175384'].reverse();
    });
});
