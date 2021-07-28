var map, infobox, dataLayer, directionsManager;


var sdsDataSourceUrl = 'http://spatial.virtualearth.net/REST/v1/data/20181f26d9e94c81acdf9496133d4f23/FourthCoffeeSample/FourthCoffeeShops';

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        center: new Microsoft.Maps.Location(-23.2885949, -46.8365055),
        zoom: 9,
        /* mapTypeId: Microsoft.Maps.MapTypeId.canvasDark, */
    });

    var center = map.getCenter();
    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
        callback: () => {
            var manager = new Microsoft.Maps.AutosuggestManager({ maxResults: 5, businessSuggestions: true });
            manager.attachAutosuggest('#searchBox', '#searchBoxContainer', (suggestionResult) => {
                /* document.getElementsByTagName('input')[20].value = suggestionResult.formattedSuggestion; */
            })
        },
        errorCallback: (message) => {
            document.getElementById('printoutPanel').innerHTML = message;
        }
    });





    /* Morumbi */
    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var morumbi = Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-23.5868687, -46.725204), 4.1, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zonaMorumbi = new Microsoft.Maps.Polygon(morumbi, { fillColor: 'rgba(255,10,10 , 0.00)', strokeColor: 'rgba(200,0,10 , 0.5)' });
        map.entities.push(zonaMorumbi);
    });
    /* Campinas */

    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var campinas = Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-22.8608181, -47.0237889), 4.1, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zonaCampinas = new Microsoft.Maps.Polygon(campinas, { fillColor: 'rgba(255,10,10 , 0.00)', strokeColor: 'rgba(200,0,10 , 0.5)' });
        map.entities.push(zonaCampinas);

    });


    /* Tamboré */
    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var campinas = Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-23.5009333, -46.8388595), 4.1, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zonaCampinas = new Microsoft.Maps.Polygon(campinas, { fillColor: 'rgba(255,10,10 , 0.00)', strokeColor: 'rgba(200,0,10 , 0.5)' });
        map.entities.push(zonaCampinas);

    }); /*  */
    /* São José do Rio Preto */
    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var saojrp = Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-20.8250415, -49.3870208), 4.1, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zonaSaojrp = new Microsoft.Maps.Polygon(saojrp, { fillColor: 'rgba(255,10,10 , 0.00)', strokeColor: 'rgba(200,0,10 , 0.5)' });
        map.entities.push(zonaSaojrp);

    }); /*  */



    var pinMorumbi = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.5868687, -46.725204), {
        icon: 'https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png',
        anchor: new Microsoft.Maps.Point(30, 40)
    });


    var pinCampinas = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.8608181, -47.0237889), {
        icon: 'https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png',
        anchor: new Microsoft.Maps.Point(30, 40)
    });

    var pinTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.5009333, -46.8388595), {
        icon: 'https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png',
        anchor: new Microsoft.Maps.Point(30, 40)
    });

    var pinSJRP = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-20.8250415, -49.3870208), {
        icon: 'https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png',
        anchor: new Microsoft.Maps.Point(30, 40)
    });

    map.entities.push(pinMorumbi);
    map.entities.push(pinCampinas);
    map.entities.push(pinTambore);
    map.entities.push(pinSJRP);


    var leandro = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6962183, -46.8001089), { icon: 'https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/leandro.png', title: 'Leandro 18km' });
    var waltecir = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.7934763, -46.7358249), { icon: 'https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/waltecir.png', title: 'Waltecir 33km' });
    var katia = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6238028, -46.5201495), { icon: 'https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/katia.png', title: 'Katia 28km' });

    var Giovanni = new Microsoft.Maps.Pushpin(new Microsoft.Maps.location(-23.6228798, -46.7851234), { title: "Giovanni", color: '#ff0' });

    map.entities.push(Giovanni)
    map.entities.push(leandro);
    map.entities.push(waltecir);
    map.entities.push(katia);



    var Elaine = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.8329119, -47.2793299), { title: 'Elaine', color: 'violet' });
    var MarcoAntonio = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.8815922, -47.0400661), { title: 'Marco Antonio', color: 'orange' });
    var AntonioValter = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.862145, -47.0572087), { title: 'Antonio Valter', color: "red" });
    var joseCarlos = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.8644, -47.0676004), { title: 'José Carlos', color: "black" });

    map.entities.push(MarcoAntonio);
    map.entities.push(Elaine);
    map.entities.push(AntonioValter);
    map.entities.push(joseCarlos);

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
    /*  var alertRota = document.querySelector('#alertRota')

     if (e.routeSummary[0].distance > 30.000) {
         alertRota.style.display = 'block'
         alertRota.innerHTML = `A rota atual ultrapassa so 30Km`
         setInterval(() => {
             alertRota.style.display = 'none'
         }, 6000)
     } else if (e.routeSummary[0].distance > 19.000) {
         alertRota.style.display = ''
         alertRota.innerHTML = `A rota atual Menor que 20Km`
         setInterval(() => {
             alertRota.style.display = 'none'
         }, 6000)

     } */
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



/* Não é Mapa */

var caixaText = document.getElementById('caixaText')
var campos = document.getElementsByTagName('input')

var btnDeletar = document.getElementById('btnDeletar')
var btnOk = document.getElementById('btnOk')
var btnMostrar = document.getElementById('btnMostrar')
var btnSearch = document.getElementById('btnSearch')

function mostarOcultar() {
    if (caixaText.style.display == "none") {
        caixaText.style.display = "block"
    } else {
        caixaText.style.display = "none"
    }
}

function mostarOcultarSearch() {
    if (searchBoxContainer.style.display == "none") {
        searchBoxContainer.style.display = "block"
    } else {
        searchBoxContainer.style.display = "none"
    }
}


function limparCampos() {
    for (let i = 0; i < 30; i++) {
        campos[i + 21].value = ""
    }

}

document.body.onload = () => {
    adionar5()
}

onkeydown = (e) => {
    if (e.shiftKey && e.code == 'Enter') { mostarOcultar() }
    if (e.ctrlKey && e.code == 'Delete') { limparCampos() }
    if (e.ctrlKey && e.code == 'Enter') { adionar5() }
    if (e.shiftKey && e.key == 'S') { mostarOcultarSearch() }
}



btnMostrar.onclick = () => { mostarOcultar() }
btnDeletar.onclick = () => { limparCampos() }
btnSearch.onclick = () => { mostarOcultarSearch() }

var selecione = document.getElementById('selecione')

selecione.onchange = () => {
    document.getElementsByTagName('input')[20].value = selecione.value
    document.getElementsByTagName('input')[20].focus()
}

btnOk.onclick = () => {
    document.getElementsByTagName('input')[20].value = selecione.value
    for (let i = 0; i < 30; i++) {
        let valor = `${caixaText.value.split('\n')[i]}`
        campos[i + 21].value = valor.trim()
    }

}
