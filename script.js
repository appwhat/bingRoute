var map, infobox, dataLayer, directionsManager;

//Query URL to the Fourth Coffe Shop data source
/* var sdsDataSourceUrl = 'http://spatial.virtualearth.net/REST/v1/data/20181f26d9e94c81acdf9496133d4f23/FourthCoffeeSample/FourthCoffeeShops'; */

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {});


    //Create a layer for rendering the data that is along a route.
    dataLayer = new Microsoft.Maps.Layer();

    //Add the layer to the map.
    map.layers.insert(dataLayer);

    //Add click event to shapes in the data layer.
    Microsoft.Maps.Events.addHandler(dataLayer, 'click', shapeClicked);

    //Create an infobox at the center of the map but don't show it.
    /* infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: true,
        title: 'Carrefour',
        description: ''
    }); */

    //Assign the infobox to a map instance.
    //infobox.setMap(map);

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





    /* Desenho */

    Microsoft.Maps.loadModule('Microsoft.Maps.DrawingTools', function() {
        //Create an instance of the DrawingTools class and bind it to the map.
        var tools = new Microsoft.Maps.DrawingTools(map);

        //Show the drawing toolbar and enable editting on the map.
        tools.showDrawingManager(function(manager) {

            //Add events to the drawing manager.
            Microsoft.Maps.Events.addHandler(manager, 'drawingChanged', function() { highlight('drawingChanged'); });
            Microsoft.Maps.Events.addHandler(manager, 'drawingChanging', function() { highlight('drawingChanging'); });
            Microsoft.Maps.Events.addHandler(manager, 'drawingEnded', function() { highlight('drawingEnded'); });
            Microsoft.Maps.Events.addHandler(manager, 'drawingErased', function() { highlight('drawingErased'); });
            Microsoft.Maps.Events.addHandler(manager, 'drawingModeChanged', function() { highlight('drawingModeChanged'); });
            Microsoft.Maps.Events.addHandler(manager, 'drawingStarted', function() { highlight('drawingStarted'); });
        })
    });

    function highlight(id) {
        //Highlight the mouse event div to indicate that the event has fired.

        //Remove the highlighting after a second.

    }

    /* Desenho */





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
        /* queryUrl: sdsDataSourceUrl, */
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
