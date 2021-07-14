var map, infobox, dataLayer, directionsManager;


var sdsDataSourceUrl = 'http://spatial.virtualearth.net/REST/v1/data/20181f26d9e94c81acdf9496133d4f23/FourthCoffeeSample/FourthCoffeeShops';

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        center: new Microsoft.Maps.Location(-23.58686, -46.72520),
        zoom: 12,
        /* mapTypeId: Microsoft.Maps.MapTypeId.canvasDark, */
    });

    var center = map.getCenter();


    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var locations = Microsoft.Maps.SpatialMath.getRegularPolygon(center, 4.1, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zona = new Microsoft.Maps.Polygon(locations, { fillColor: 'rgba(255,10,10 , 0.00)', strokeColor: 'rgba(200,0,10 , 0.5)' });
        map.entities.push(zona);

    });






    var pin = new Microsoft.Maps.Pushpin(center, {
        icon: 'https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png',
        anchor: new Microsoft.Maps.Point(30, 40)
    });

    map.entities.push(pin);

    var diego = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6039345, -46.8183921), { icon: 'https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/diego.png', title: 'Diego 16km' });
    var leandro = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6962183, -46.8001089), { icon: 'https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/leandro.png', title: 'Leandro 18km' });
    var waltecir = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.7934763, -46.7358249), { icon: 'https://raw.githubusercontent.com/appwhat/bingRoute/main//motors/waltecir.png', title: 'Waltecir 33km' });
    var katia = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6238028, -46.5201495), { icon: 'https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/katia.png', title: 'Katia 28km' });
    map.entities.push(diego);
    map.entities.push(leandro);
    map.entities.push(waltecir);
    map.entities.push(katia);

    //Create a layer for rendering the data that is along a route.
    dataLayer = new Microsoft.Maps.Layer();

    //Add the layer to the map.
    map.layers.insert(dataLayer);

    //Add click event to shapes in the data layer.
    Microsoft.Maps.Events.addHandler(dataLayer, 'click', shapeClicked);


    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false,
        title: `Sam's Culub Morumbi`,
        description: 'Raio de 10km'
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    //Load the directions and spatial data service modules.
    Microsoft.Maps.loadModule(['Microsoft.Maps.Directions', 'Microsoft.Maps.SpatialDataService'], function() {
        //Create an instance of the directions manager.
        directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

        //Specify where to display the route instructions.
        directionsManager.setRenderOptions({
            itineraryContainer: '#directionsItinerary'
        });

        //Specify the where to display the input panel
        directionsManager.showInputPanel('directionsPanel');

        //Add event handler to directions manager.
        Microsoft.Maps.Events.addHandler(directionsManager, 'directionsUpdated', directionsUpdated);
    });



    Microsoft.Maps.loadModule('Microsoft.Maps.DrawingTools', function() {
        //Create an instance of the DrawingTools class and bind it to the map.
        var tools = new Microsoft.Maps.DrawingTools(map);

        //Show the drawing toolbar and enable editting on the map.
        tools.showDrawingManager(function(manager) {

            //Add events to the drawing manager.
            Microsoft.Maps.Events.addHandler(manager, 'drawingStarted', function() {
                /* Desenhe algo */
            });
        })
    });
}

function directionsUpdated(e) {
    dataLayer.clear();

    var currentRoute = directionsManager.getCurrentRoute();

    if (!currentRoute) {
        alert('No route found.');
        return;
    }

    var routeRequest = directionsManager.getRequestOptions();

    var routeMode = getRouteMode(routeRequest);

    if (!routeMode) {
        alert('Transit mode is not supported for near route queries.');
        return;
    }

    //Create a query to get nearby data.
    var queryOptions = {
        queryUrl: sdsDataSourceUrl,
        spatialFilter: {
            spatialFilterType: 'nearRoute',
            start: currentRoute.routeLegs[0].startWaypointLocation,
            end: currentRoute.routeLegs[0].endWaypointLocation,
            travelMode: getRouteMode(routeRequest),
            optimize: getRouteOptimization(routeRequest),
        }
    };

    //Process the query.
    Microsoft.Maps.SpatialDataService.QueryAPIManager.search(queryOptions, map, function(data) {
        //Add results to the map.
        dataLayer.add(data);
    });
}

function getRouteMode(routeRequest) {
    switch (routeRequest.routeMode) {
        case Microsoft.Maps.Directions.RouteMode.driving:
            return 'Driving';
        case Microsoft.Maps.Directions.RouteMode[routeRequest.routeMode].walking:
            return 'Walking';
    }

    return null;
}

function getRouteOptimization(routeRequest) {
    switch (routeRequest.routeOptimize) {
        case Microsoft.Maps.Directions.RouteOptimization.timeWithTraffic:
            return 'timeWithTraffic';
        case Microsoft.Maps.Directions.RouteOptimization.shortestDistance:
            return 'distance';
        case Microsoft.Maps.Directions.RouteOptimization.shortestTime:
        default:
            return 'time';
    }
}


function shapeClicked(e) {
    alert()
        //Make sure the infobox has metadata to display.
    if (e.primitive.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.primitive.getLocation(),
            title: e.primitive.metadata.Name,
            description: 'Store Type: ' + e.primitive.metadata.StoreType,
            visible: true
        });
    }
}



var btnInserir = document.getElementById('btnInserir')
var address = { address: " " }

function adionar5() {

    var waypoint1 = new Microsoft.Maps.Directions.Waypoint(address),
        waypoint2 = new Microsoft.Maps.Directions.Waypoint(address),
        waypoint3 = new Microsoft.Maps.Directions.Waypoint(address),
        waypoint4 = new Microsoft.Maps.Directions.Waypoint(address),
        waypoint5 = new Microsoft.Maps.Directions.Waypoint(address);
    directionsManager.addWaypoint(waypoint1)
    directionsManager.addWaypoint(waypoint2);
    directionsManager.addWaypoint(waypoint3);
    directionsManager.addWaypoint(waypoint4);
    directionsManager.addWaypoint(waypoint5);

}

btnInserir.onclick = () => {
    adionar5()
}
document.body.onload = () => {
    adionar5()
}


/* Não é Mapa */

var caixaText = document.getElementById('caixaText')
var campos = document.getElementsByTagName('input')

var btnDeletar = document.getElementById('btnDeletar')
var btnOk = document.getElementById('btnOk')
var btnMostrar = document.getElementById('btnMostrar')

function mostarOcultar() {
    if (caixaText.style.display == "none") {
        caixaText.style.display = "block"
    } else {
        caixaText.style.display = "none"
    }
}

function limparCampos() {
    for (let i = 0; i < 30; i++) {
        campos[i + 20].value = ""
    }

}


onkeydown = (e) => {
    if (e.shiftKey && e.code == 'Enter') { mostarOcultar() }
    if (e.ctrlKey && e.code == 'Delete') { limparCampos() }
    if (e.ctrlKey && e.code == 'Enter') { adionar5() }
}



btnMostrar.onclick = () => { mostarOcultar() }
btnDeletar.onclick = () => { limparCampos() }

var selecione = document.getElementById('selecione')

selecione.onchange = () => {
    document.getElementsByTagName('input')[19].value = selecione.value
    document.getElementsByTagName('input')[19].focus()
}

btnOk.onclick = () => {
    document.getElementsByTagName('input')[19].value = selecione.value
    for (let i = 0; i < 30; i++) {
        let valor = `${caixaText.value.split('\n')[i]}`
        campos[i + 20].value = valor.trim()
    }

}
