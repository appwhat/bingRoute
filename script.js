var map,infobox,dataLayer,directionsManager,sdsDataSourceUrl="http://spatial.virtualearth.net/REST/v1/data/20181f26d9e94c81acdf9496133d4f23/FourthCoffeeSample/FourthCoffeeShops";function GetMap(){(map=new Microsoft.Maps.Map("#myMap",{center:new Microsoft.Maps.Location(-23.2885949,-46.8365055),zoom:9})).getCenter();Microsoft.Maps.loadModule("Microsoft.Maps.AutoSuggest",{callback:()=>{new Microsoft.Maps.AutosuggestManager({maxResults:5,businessSuggestions:!0}).attachAutosuggest("#searchBox","#searchBoxContainer",t=>{})},errorCallback:t=>{document.getElementById("printoutPanel").innerHTML=t}}),Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath",function(){var t=Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-23.5868687,-46.725204),4.1,100,Microsoft.Maps.SpatialMath.DistanceUnits.Miles),o=new Microsoft.Maps.Polygon(t,{fillColor:"rgba(255,10,10 , 0.00)",strokeColor:"rgba(200,0,10 , 0.5)"});map.entities.push(o)}),Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath",function(){var t=Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-22.8608181,-47.0237889),4.1,100,Microsoft.Maps.SpatialMath.DistanceUnits.Miles),o=new Microsoft.Maps.Polygon(t,{fillColor:"rgba(255,10,10 , 0.00)",strokeColor:"rgba(200,0,10 , 0.5)"});map.entities.push(o)}),Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath",function(){var t=Microsoft.Maps.SpatialMath.getRegularPolygon(new Microsoft.Maps.Location(-23.5185274,-46.8388432),4.1,100,Microsoft.Maps.SpatialMath.DistanceUnits.Miles),o=new Microsoft.Maps.Polygon(t,{fillColor:"rgba(255,10,10 , 0.00)",strokeColor:"rgba(200,0,10 , 0.5)"});map.entities.push(o)});var t=new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.5868687,-46.725204),{icon:"https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png",anchor:new Microsoft.Maps.Point(30,40)}),o=new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.8608181,-47.0237889),{icon:"https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png",anchor:new Microsoft.Maps.Point(30,40)}),e=new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.5185274,-46.8388432),{icon:"https://static0.tiendeo.com.br/upload_negocio/negocio_21/logo2.png",anchor:new Microsoft.Maps.Point(30,40)});map.entities.push(t),map.entities.push(o),map.entities.push(e);var a=new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6039345,-46.8183921),{icon:"https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/diego.png",title:"Diego 16km"}),i=new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6962183,-46.8001089),{icon:"https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/leandro.png",title:"Leandro 18km"}),n=new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.7934763,-46.7358249),{icon:"https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/waltecir.png",title:"Waltecir 33km"}),s=new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-23.6238028,-46.5201495),{icon:"https://raw.githubusercontent.com/appwhat/bingRoute/main/motors/katia.png",title:"Katia 28km"}),r=new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.9029219,-47.2153149),{title:"Cristiane",color:"violet"}),c=new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.8815922,-47.0400661),{title:"Marco Antonio",color:"orange"}),p=new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-22.862145,-47.0572087),{title:"Antonio Valter",color:"red"});map.entities.push(a),map.entities.push(i),map.entities.push(n),map.entities.push(s),map.entities.push(c),map.entities.push(r),map.entities.push(p),dataLayer=new Microsoft.Maps.Layer,map.layers.insert(dataLayer),Microsoft.Maps.Events.addHandler(dataLayer,"click",shapeClicked),(infobox=new Microsoft.Maps.Infobox(map.getCenter(),{visible:!1,title:"Sam's Culub Morumbi",description:"Raio de 10km"})).setMap(map),Microsoft.Maps.loadModule(["Microsoft.Maps.Directions","Microsoft.Maps.SpatialDataService"],function(){(directionsManager=new Microsoft.Maps.Directions.DirectionsManager(map)).setRenderOptions({itineraryContainer:"#directionsItinerary"}),directionsManager.showInputPanel("directionsPanel"),Microsoft.Maps.Events.addHandler(directionsManager,"directionsUpdated",directionsUpdated)}),Microsoft.Maps.loadModule("Microsoft.Maps.DrawingTools",function(){new Microsoft.Maps.DrawingTools(map).showDrawingManager(function(t){Microsoft.Maps.Events.addHandler(t,"drawingStarted",function(){})})})}function directionsUpdated(t){dataLayer.clear();var o=directionsManager.getCurrentRoute();if(o){var e=directionsManager.getRequestOptions();if(getRouteMode(e)){var a={queryUrl:sdsDataSourceUrl,spatialFilter:{spatialFilterType:"nearRoute",start:o.routeLegs[0].startWaypointLocation,end:o.routeLegs[0].endWaypointLocation,travelMode:getRouteMode(e),optimize:getRouteOptimization(e)}};Microsoft.Maps.SpatialDataService.QueryAPIManager.search(a,map,function(t){dataLayer.add(t)})}else alert("Transit mode is not supported for near route queries.")}else alert("No route found.")}function getRouteMode(t){switch(t.routeMode){case Microsoft.Maps.Directions.RouteMode.driving:return"Driving";case Microsoft.Maps.Directions.RouteMode[t.routeMode].walking:return"Walking"}return null}function getRouteOptimization(t){switch(t.routeOptimize){case Microsoft.Maps.Directions.RouteOptimization.timeWithTraffic:return"timeWithTraffic";case Microsoft.Maps.Directions.RouteOptimization.shortestDistance:return"distance";case Microsoft.Maps.Directions.RouteOptimization.shortestTime:default:return"time"}}function shapeClicked(t){alert(),t.primitive.metadata&&infobox.setOptions({location:t.primitive.getLocation(),title:t.primitive.metadata.Name,description:"Store Type: "+t.primitive.metadata.StoreType,visible:!0})}var btnInserir=document.getElementById("btnInserir"),address={address:" "};function adionar5(){var t=new Microsoft.Maps.Directions.Waypoint(address),o=new Microsoft.Maps.Directions.Waypoint(address),e=new Microsoft.Maps.Directions.Waypoint(address),a=new Microsoft.Maps.Directions.Waypoint(address),i=new Microsoft.Maps.Directions.Waypoint(address);directionsManager.addWaypoint(t),directionsManager.addWaypoint(o),directionsManager.addWaypoint(e),directionsManager.addWaypoint(a),directionsManager.addWaypoint(i)}btnInserir.onclick=(()=>{adionar5()});var caixaText=document.getElementById("caixaText"),campos=document.getElementsByTagName("input"),btnDeletar=document.getElementById("btnDeletar"),btnOk=document.getElementById("btnOk"),btnMostrar=document.getElementById("btnMostrar"),btnSearch=document.getElementById("btnSearch");function mostarOcultar(){"none"==caixaText.style.display?caixaText.style.display="block":caixaText.style.display="none"}function mostarOcultarSearch(){"none"==searchBoxContainer.style.display?searchBoxContainer.style.display="block":searchBoxContainer.style.display="none"}function limparCampos(){for(let t=0;t<30;t++)campos[t+21].value=""}document.body.onload=(()=>{adionar5()}),onkeydown=(t=>{t.shiftKey&&"Enter"==t.code&&mostarOcultar(),t.ctrlKey&&"Delete"==t.code&&limparCampos(),t.ctrlKey&&"Enter"==t.code&&adionar5(),(t.shiftKey&&"S"==t.key||t.shiftKey&&"s"==t.key)&&mostarOcultarSearch()}),btnMostrar.onclick=(()=>{mostarOcultar()}),btnDeletar.onclick=(()=>{limparCampos()}),btnSearch.onclick=(()=>{mostarOcultarSearch()});var selecione=document.getElementById("selecione");selecione.onchange=(()=>{document.getElementsByTagName("input")[20].value=selecione.value,document.getElementsByTagName("input")[20].focus()}),btnOk.onclick=(()=>{document.getElementsByTagName("input")[20].value=selecione.value;for(let t=0;t<30;t++){let o=`${caixaText.value.split("\n")[t]}`;campos[t+21].value=o.trim()}});
