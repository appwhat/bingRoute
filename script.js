var map, infobox, dataLayer, directionsManager;
/* 
var midnightCommander = {
    "version": "1.0",
    "settings": {
        "landColor": "#0B334D"
    },
    "elements": {
        "mapElement": {
            "labelColor": "#FFFFFF",
            "labelOutlineColor": "#000000"
        },
        "political": {
            "borderStrokeColor": "#144B53",
            "borderOutlineColor": "#00000000"
        },
        "point": {
            "iconColor": "#0C4152",
            "fillColor": "#f0f0f0",
            "strokeColor": "#0C4152"
        },
        "transportation": {
            "strokeColor": "#f0f0f0",
            "fillColor": "#f0f0f0"
        },
        "highway": {
            "strokeColor": "#158399",
            "fillColor": "#f0f0f0"
        },
        "controlledAccessHighway": {
            "strokeColor": "#158399",
            "fillColor": "#f0f0f0"
        },
        "arterialRoad": {
            "strokeColor": "#157399",
            "fillColor": "#f0f0f0"
        },
        "majorRoad": {
            "strokeColor": "#157399",
            "fillColor": "#f0f0f0"
        },
        "railway": {
            "strokeColor": "#146474",
            "fillColor": "#f0f0f0"
        },
        "structure": {
            "fillColor": "#115166"
        },
        "water": {
            "fillColor": "#021019"
        },
        "area": {
            "fillColor": "#115166"
        }
    }
}; */
var sdsDataSourceUrl = 'https://spatial.virtualearth.net/REST/v1/data/f42cab32d0ee41738d90856badd638d3/USCensus2010_ZCTA5/ZCTA5';



function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        center: new Microsoft.Maps.Location(-23.2885949, -46.8365055),
        zoom: 9,
        /* customMapStyle: midnightCommander */
        /* mapTypeId: Microsoft.Maps.MapTypeId.canvasDark, */
    });


    var center = map.getCenter();
    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
        callback: () => {
            var manager = new Microsoft.Maps.AutosuggestManager({ maxResults: 5, businessSuggestions: true });
            manager.attachAutosuggest('#searchBox', '#searchBoxContainer', (suggestionResult) => {
                console.log(suggestionResult)
                document.getElementsByTagName('input')[20].value = suggestionResult.subtitle
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
        var zonaMorumbi = new Microsoft.Maps.Polygon(morumbi, { fillColor: 'rgba(0,148,210, 0.2)', strokeColor: 'rgba(0,148,210 0.2)' });
        map.entities.push(zonaMorumbi);
    });
    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var morumbi5 = Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-23.5863118, -46.7237101), 3, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zonaMorumbi = new Microsoft.Maps.Polygon(morumbi5, { fillColor: 'rgba(0,0,210, 0.0)', strokeColor: 'rgba(0,148,210 0.0)' });
        map.entities.push(zonaMorumbi);
    });
    /* Campinas */

    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var campinas = Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-22.8608181, -47.0237889), 6, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zonaCampinas = new Microsoft.Maps.Polygon(campinas, { fillColor: 'rgba(0,148,210, 0.2)', strokeColor: 'rgba(0,148,210 0.2)' });
        map.entities.push(zonaCampinas);

    });


    /*SAM`S Tamboré */
    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var tamboré = Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-23.5009333, -46.8388595), 6, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zonaTamboré = new Microsoft.Maps.Polygon(tamboré, { fillColor: 'rgba(0,148,210, 0.2)', strokeColor: 'rgba(0,148,210 0.2)' });
        map.entities.push(zonaTamboré);

    }); /*  */
    /*BIG Tamboré */
    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var bigTamboré = Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-23.50098992879626, -46.836054831837195), 6, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zonabigTamboré = new Microsoft.Maps.Polygon(bigTamboré, { fillColor: 'rgba(0,148,210, 0.2)', strokeColor: 'rgba(0,148,210 0.2)' });
        map.entities.push(zonabigTamboré);

    }); /*  */
    /* São José do Rio Preto */
    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        // Get locations of a regular hexagon, 5 miles from each vertex the map center
        var saojrp = Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-20.8250415, -49.3870208), 6, 100, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        var zonaSaojrp = new Microsoft.Maps.Polygon(saojrp, { fillColor: 'rgba(0,148,210, 0.2)', strokeColor: 'rgba(0,148,210 0.2)' });
        map.entities.push(zonaSaojrp);

    }); /*  */



    var pinMorumbi = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.5863118, -46.7237101), {
        icon: 'https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png',
        anchor: new Microsoft.Maps.Point(30, 40)
    });
    /* https://img.icons8.com/fluency/32/000000/driver.png */

    var pinCampinas = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.8608181, -47.0237889), {
        icon: 'https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png',
        anchor: new Microsoft.Maps.Point(30, 40)
    });

    var pinTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.5008784486396, -46.8366598054593), {
        icon: 'https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png',
        anchor: new Microsoft.Maps.Point(30, 40),
        title: "Sam´s Tamboré"
    });

    var pinBigTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.501128906451363, -46.83603771803761), {
        icon: 'https://bighiper.vtexassets.com/assets/vtex.file-manager-graphql/images/e959be9a-138c-4914-855d-0288deb73727___5a363558d74b987c60d716bef9ceffb4.png',
        anchor: new Microsoft.Maps.Point(50, 40),
        title: "Big Tamboré"
    });

    var pinSJRP = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-20.8250415, -49.3870208), {
        icon: 'https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png',
        anchor: new Microsoft.Maps.Point(30, 40)
    });

    map.entities.push(pinBigTambore);
    map.entities.push(pinMorumbi);
    map.entities.push(pinCampinas);
    map.entities.push(pinTambore);
    map.entities.push(pinSJRP);
    /* Centralizar */
    Microsoft.Maps.Events.addHandler(pinBigTambore, 'click', function(args) { map.setView({ center: args.target.getLocation(), zoom: 13 }); });
    Microsoft.Maps.Events.addHandler(pinMorumbi, 'click', function(args) { map.setView({ center: args.target.getLocation(), zoom: 13 }); });
    Microsoft.Maps.Events.addHandler(pinCampinas, 'click', function(args) { map.setView({ center: args.target.getLocation(), zoom: 13 }); });
    Microsoft.Maps.Events.addHandler(pinTambore, 'click', function(args) { map.setView({ center: args.target.getLocation(), zoom: 13 }); });
    Microsoft.Maps.Events.addHandler(pinSJRP, 'click', function(args) { map.setView({ center: args.target.getLocation(), zoom: 13 }); });

    //Posto
    var PostoOsasco = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.50564480864178, -46.788773337021965), {
        icon: "https://img.icons8.com/fluency/48/000000/gas-pump.png",
        anchor: new Microsoft.Maps.Point(50, 40),
        title: "Posto Osasco"
    });

    var PostoMorumbi = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.587883074040803, -46.723281091118295), {
        icon: "https://img.icons8.com/fluency/48/000000/gas-pump.png",
        anchor: new Microsoft.Maps.Point(50, 40),
        title: "Posto Morumbi"
    });

    map.entities.push(PostoOsasco);
    map.entities.push(PostoMorumbi);


    var igor = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.64738054016382, -46.72211961974586), { title: 'Igor José Gomes de Barros Macedo DZZ2F46', color: 'black', icon: "https://img.icons8.com/fluency/32/000000/driver.png" });

    //var JhonatasMorumbi = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.770671548686664, -46.715081647170436), { title: 'Jhonatas Fernandes FHN6709', color: 'black', icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    //var JonnyMorumbi = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.622915137929112, -46.80977578765919), { title: 'Johnny dos Santos EUF2D36', color: 'black', icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var leandro = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6962183, -46.8001089), { title: 'Leandro da Silva Gadelha EBN3A31', color: 'black', icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var waltecir = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.7934763, -46.7358249), { title: 'Waltecir da Silva EDT1660', color: 'black', icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    //var leandroNovato = new Microsoft.Maps.Pushpin(newdsd Microsoft.Maps.Location(-23.6212564, -46.8012588), { title: 'Leandro Souza Batista IWX7705', color: 'black', icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var giovanni = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6228847, -46.7851234), { title: "Giovani de Oliveira FLN4J40", color: 'black', icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var julio = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6624916, -46.8192952), { title: "Julio Cesar Campanha OMA2349", color: 'black', icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var Renan = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.553963566459668, -46.531135976833674), { title: "Renan Molina Ruz Baldi FGE8113", color: 'black', icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var Hernani = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.582733861613768, -46.72849980441773), { title: 'hernani artogi  FGE8113', color: "blue", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });

    //Tambore

    var JeffersonAkiraTamboré = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.531898189352848, -46.86100226067139), { title: 'Jefferson Akira Mizusaki LKV8459', color: "blue", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    //Verificar o endereço do Carlos    
    var carlosTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.532811112543776, -46.80360364717909), { title: 'Carlos Alberto Assis de Oliveira KNM5791', color: "blue", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var FernandoTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.403597546910227, -46.74366104749553), { title: 'Fernando Arruda EIH2018', color: "blue", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var joseTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.52269463361998, -46.711636336628345), { title: 'Jose de Farias Silva CVT8670', color: "blue", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var MayconTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.49635965799176, -46.80293806536161), { title: 'Maycon Erickson dos Santos DEN9H93', color: "blue", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var DanielTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.54718826039277, -46.85750743207862), { title: 'Daniel Araujo de lima LKV8459', color: "blue", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var OrlandoTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.489180953309173, -46.79066493176556), { title: 'Orlando Lemes DZB0993', color: "blue", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var WesleyTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.548306638271093, -46.83524651582318), { title: 'Wesley Souza Santos DEE9135', color: "blue", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var EdvalTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.51104904468552, -46.785195060775266), { title: 'Edval Custódio João de Souza GEU1684', color: "blue", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var ManoelTambore = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.425619157731724, -46.84948264686319), { title: 'Manoel Charles dos Santos EPH8J72', color: "blue", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });

    //CAMPINAS
    var Marcus = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.91531779914263, -47.077845232656465), { title: 'Marcus Vinicius de Carvalho EYT7A50', color: "red", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var alimateia = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.934970393931067, -47.12454670443228), { title: 'Alimateia Teixeira dos Santos BWQ5F02', color: "red", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var MarcoAntonio = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.8815922, -47.0400661), { title: 'Marco Antonio Ribeiro QNB4C23', color: "red", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var AntonioValter = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.862145, -47.0572087), { title: 'Antonio Valter Fávero FDV5443', color: "red", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var joseCarlos = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.8644, -47.0676004), { title: 'José carlos Butin FZU4H56', color: "red", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });

    //SJRP
    var LeandroSJRP = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-20.81478422884874, -49.48804826144113), { title: 'Leandro Santana Oliveira DNK9I59', color: "red", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var ThiagoSJRP = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-20.754241125224006, -49.43428855902518), { title: 'Thiago Leme Siva EBP8744', color: "red", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });
    var Agnaldo = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-20.776861763470453, -49.359622190296285), { title: 'Agnaldo Cesar Machado EJW9635', color: "black", icon: "https://img.icons8.com/fluency/32/000000/driver.png" });

    map.entities.push(igor);
    map.entities.push(Hernani);

    map.entities.push(carlosTambore);
    map.entities.push(ManoelTambore);
    map.entities.push(carlosTambore);
    map.entities.push(FernandoTambore);
    map.entities.push(JeffersonAkiraTamboré);
    map.entities.push(MayconTambore);
    map.entities.push(DanielTambore);
    map.entities.push(OrlandoTambore);
    map.entities.push(WesleyTambore);
    map.entities.push(EdvalTambore);

    //map.entities.push(JhonatasMorumbi);
    //map.entities.push(JonnyMorumbi);
    map.entities.push(leandro);
    map.entities.push(waltecir);
    map.entities.push(Renan);
    //map.entities.push(leandroNovato);
    map.entities.push(giovanni)
    map.entities.push(julio)

    map.entities.push(LeandroSJRP)
    map.entities.push(ThiagoSJRP)
    map.entities.push(Agnaldo)

    map.entities.push(Marcus);
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
            itineraryContainer: '#directionsItinerary',

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

    /* Função KMs */

    var routeIdx = directionsManager.getRequestOptions().routeIndex;

    //Get the distance of the route, rounded to 2 decimal places.
    var distance = Math.round(e.routeSummary[routeIdx].distance * 100) / 100;

    //Get the distance units used to calculate the route.
    var units = directionsManager.getRequestOptions().distanceUnit;
    var distanceUnits = '';

    if (units == Microsoft.Maps.Directions.DistanceUnit.km) {
        distanceUnits = 'km'
    } else {
        //Must be in miles
        distanceUnits = 'miles'
    }

    //Time is in seconds, convert to minutes and round off.
    var time = Math.round(e.routeSummary[routeIdx].timeWithTraffic / 60);


    /*     console.log(e.routeSummary[0].distance) Verificar os Kms
     */
    if (distance > 30) {
        document.getElementById('routeInfoPanel').innerHTML = `Rota: Dificil`

        /*         document.getElementById('routeInfoPanel').innerHTML = `Rota: Dificil <br/> Distancia: ${distance}  ${distanceUnits} - Tempo: ${time} minutos;`
         */
    } else if (distance > 20 && distance < 30) {
        document.getElementById('routeInfoPanel').innerHTML = `Rota: Média`

        /*         document.getElementById('routeInfoPanel').innerHTML = `Rota: Média <br/> Distancia: ${distance}  ${distanceUnits} - Tempo: ${time} minutos;`
         */
    } else {
        document.getElementById('routeInfoPanel').innerHTML = `Rota: Facil`

        /*         document.getElementById('routeInfoPanel').innerHTML = `Rota: Facil <br/> Distancia: ${distance}  ${distanceUnits} - Tempo: ${time} minutos;`
         */
    }
    /*console.log(e)
      var alertRota = document.querySelector('#alertRota')

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
const valorTrans = document.getElementById('controle')


function mostarOcultar() {
    if (caixaText.style.display == "none") {
        caixaText.style.display = "block"
        valorTrans.style.display = "block";
        caixaText.focus()
    } else {
        caixaText.style.display = "none"
        valorTrans.style.display = "none";
    }
}
valorTrans.addEventListener('change', () => {
    if (valorTrans.value == 10) {
        document.getElementById('caixaText').style.background = `rgb(2, 53, 53)`
        console.log(caixaText.style.background);
    } else {
        document.getElementById('caixaText').style.background = `rgba(2, 53, 53, 0.${valorTrans.value})`
    }
})

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
    /* document.getElementsByTagName('input')[20].value = selecione.value */
    for (let i = 0; i < 25; i++) {

        let valor = `${caixaText.value.split('\n')[i]}`
        if (valor === '' || valor === 'undefined' || valor.length < 9) {
            break;
        }
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
