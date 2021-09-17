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


    Microsoft.Maps.loadModule('Microsoft.Maps.Traffic', function() {
        var manager = new Microsoft.Maps.Traffic.TrafficManager(map);
        /* Trafigo */

        onkeydown = (e) => {
            if (e.ctrlKey && e.shiftKey) { if (manager.show) { manager.hide(); } }
            if (e.ctrlKey && e.altKey) {
                if (manager.hide) {
                    manager.show();
                    manager.hideIncidents();
                }
            }
            if (e.shiftKey && e.code == 'Enter') { mostarOcultar() }
            if (e.ctrlKey && e.code == 'Delete') { limparCampos() }
            if (e.ctrlKey && e.code == 'Enter') { adionar5() }
            if (e.shiftKey && e.key == 'S') { mostarOcultarSearch() }
            if (e.ctrlKey && e.code == 'Space') { preencherAll() }
        }
    });


    /* Morumbi */
    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var morumbi = Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-23.5863118, -46.7237101), 6, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zonaMorumbi = new Microsoft.Maps.Polygon(morumbi, { fillColor: 'rgba(255,10,10 , 0.00)', strokeColor: 'rgba(200,0,10 , 0.5)' });
        map.entities.push(zonaMorumbi);
    });
    /* Campinas */

    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var campinas = Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-22.8608181, -47.0237889), 6, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zonaCampinas = new Microsoft.Maps.Polygon(campinas, { fillColor: 'rgba(255,10,10 , 0.00)', strokeColor: 'rgba(200,0,10 , 0.5)' });
        map.entities.push(zonaCampinas);

    });


    /* Tamboré */
    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var campinas = Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-23.5009333, -46.8388595), 6, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zonaCampinas = new Microsoft.Maps.Polygon(campinas, { fillColor: 'rgba(255,10,10 , 0.00)', strokeColor: 'rgba(200,0,10 , 0.5)' });
        map.entities.push(zonaCampinas);

    }); /*  */
    /* São José do Rio Preto */
    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var saojrp = Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-20.8250415, -49.3870208), 6, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zonaSaojrp = new Microsoft.Maps.Polygon(saojrp, { fillColor: 'rgba(255,10,10 , 0.00)', strokeColor: 'rgba(200,0,10 , 0.5)' });
        map.entities.push(zonaSaojrp);

    }); /*  */



    var pinMorumbi = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.5863118, -46.7237101), {
        icon: 'https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png',
        anchor: new Microsoft.Maps.Point(30, 40)
    });
    /* https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png */

    var pinCampinas = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.8608181, -47.0237889), {
        icon: 'https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png',
        anchor: new Microsoft.Maps.Point(30, 40)
    });

    var pinTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.5009333, -46.8388595), {
        icon: 'https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png',
        anchor: new Microsoft.Maps.Point(30, 40),
        title: "Campinas"
    });

    var pinSJRP = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-20.8250415, -49.3870208), {
        icon: 'https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png',
        anchor: new Microsoft.Maps.Point(30, 40)
    });

    map.entities.push(pinMorumbi);
    map.entities.push(pinCampinas);
    map.entities.push(pinTambore);
    map.entities.push(pinSJRP);


    var JhonatasMorumbi = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.770671548686664, -46.715081647170436), { title: 'Jhonatas Fernandes FHN6709', color: 'black', icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });
    var JonnyMorumbi = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.622915137929112, -46.80977578765919), { title: 'Johnny dos Santos EUF2D36', color: 'black', icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });
    var leandro = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6962183, -46.8001089), { title: 'Leandro da Silva Gadelha EBN3A31', color: 'black', icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });
    var waltecir = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.7934763, -46.7358249), { title: 'Waltecir da Silva EDT1660', color: 'black', icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });
    var leandroNovato = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6212564, -46.8012588), { title: 'Leandro Souza Batista IWX7705', color: 'black', icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });
    var giovanni = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6228847, -46.7851234), { title: "Giovani de Oliveira FLN4J40", color: 'black', icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });
    var julio = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6624916, -46.8192952), { title: "Julio", color: 'black', icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });

    var carlosTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.535047936062476, -46.79006946496187), { title: 'Carlos Eduardo Carleto MEL9103', color: "blue", icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });
    var joseTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.52269463361998, -46.711636336628345), { title: 'Jose de Farias Silva CVT8670', color: "blue", icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });
    var JeffersonAkiraTamboré = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.531898189352848, -46.86100226067139), { title: 'Jefferson Akira Mizusaki LKV8459', color: "blue", icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });

    var flavioHenrique = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.898812371440197, -47.02625422627076), { title: 'Flavio Henrique Batista FQR2J28', color: "red", icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });
    var alimateia = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.934970393931067, -47.12454670443228), { title: 'Alimateia Teixeira dos Santos BWQ5F02', color: "red", icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });
    var MarcoAntonio = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.8815922, -47.0400661), { title: 'Marco Antonio Ribeiro QNB4C23', color: "red", icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });
    var AntonioValter = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.862145, -47.0572087), { title: 'Antonio Valter Fávero FDV5443', color: "red", icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });
    var joseCarlos = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.8644, -47.0676004), { title: 'José carlos Butin FZU4H56', color: "red", icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });

    var RafaelSJRP = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-20.80910259648554, -49.51699067249802), { title: 'Rafael Soares Pires	DNK9I59', color: "red", icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });
    var EdersonSJRP = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-20.8387998301064, -49.37501794724071), { title: 'Ederson Cristiano Pereira dos Santos	ERD5I01', color: "black", icon: "https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/m3.png" });

    map.entities.push(carlosTambore);
    map.entities.push(joseTambore);
    map.entities.push(JeffersonAkiraTamboré);

    map.entities.push(JhonatasMorumbi);
    map.entities.push(JonnyMorumbi);
    map.entities.push(leandro);
    map.entities.push(waltecir);
    map.entities.push(leandroNovato);
    map.entities.push(giovanni)
    map.entities.push(julio)

    map.entities.push(RafaelSJRP)
    map.entities.push(EdersonSJRP)

    map.entities.push(flavioHenrique);
    map.entities.push(alimateia);
    map.entities.push(MarcoAntonio);
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
        caixaText.focus()
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

function preencherAll() {
    document.getElementsByTagName('input')[20].value = selecione.value
    for (let i = 0; i < 25; i++) {
        let valor = `${caixaText.value.split('\n')[i]}`
        campos[i + 21].value = valor.trim()
    }
}

btnMostrar.onclick = () => { mostarOcultar() }
btnDeletar.onclick = () => { limparCampos() }
btnSearch.onclick = () => { mostarOcultarSearch() }

var selecione = document.getElementById('selecione')

selecione.onchange = () => {
    document.getElementsByTagName('input')[20].value = selecione.value
    document.getElementsByTagName('input')[20].focus()
}



btnOk.onclick = () => preencherAll()
