/**
 * This map shows the leisure parks in the city of Salzburg. 
 * The first segment will set the map view, the basic map and the Layer control. 
 */

var map = L.map('map').setView([47.8, 13.10], 12);

var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
 
var topographicLayer = L.esri.basemapLayer("Topographic");

var baseMaps = {
    "OpenStreetMap": osmLayer,
	"Topographic": topographicLayer
};


/**
 * The Second part will call in the data and fix the attribute display.
 */

//Set the Style of the City Boundary
var cityStyle = {
 	"color": "#666699",
 	"fillColor": "#ffffff",
     "weight": 3,
     "opacity": 1
 };

 //Call in the data for the city boundary
 var city_boundary = L.geoJson(salzburg, {
     style: cityStyle
 });
 city_boundary.addTo(map);

// Set the Style of the Park Elements
var parkStyle = {
    "color": "#31B404", 
    "weight": 3,
    "opacity": 0.90
};

// Set the Icons of the Parks Elements

var parkIcon = L.icon({
    iconUrl: "./css/images/park_3.svg",
    iconSize: [25, 35]
});


// Call in the Geometry data using the GeoJson method
// var parksArea = L.geoJson(Parks,
//     {style:parkStyle});
// parksArea.addTo(map);

//var clust_mark = L.getMarkerClusterGroup();


//Calling in and styling the Park Point Data set using the geoJson method
var parksPoint = L.geoJson(parksPoint, { 
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon:parkIcon, title:"Leisure Park"});
    }, 
    onEachFeature: function(feature, layer) {
        // if (layer instanceof L.Marker) {
        //     layer.setIcon(parkIcon)
        // }
        layer.bindPopup("Name: " + feature.properties.name + "<br />" + "Land Use: " 
        + feature.properties.landuse + "<br/>" + "Access: " + feature.properties.access), 
        
        // Add Mouse-over Effect
        layer.on({
            mouseover: function(){
            layer.openPopup();
            this.setStyle({radius: 20, color: 'yellow'});
            },
            mouseout: function(){
            layer.closePopup();
            this.setStyle({color: 'blue'});
        }})
}}).addTo(map);

// clust_mark.addLayer(parksPoint)
// map.fitBounds(clust_mark.getBounds());

// Addin the Control Layer -- contains the BaseMap and the Features Layers

var features = {
    "Leisure Parks Points": parksPoint, 
    "City Boundary": city_boundary
    // "Leisure Parks Areas": parksArea
};

L.control.layers(baseMaps, features, {position:'topright'}).addTo(map);

// A basic scale is added and only the metric scale is shown. 
L.control.scale({position: 'bottomright'}).addTo(map);

// Adding Basic Interactivity
//Get the Coordinate of any where you click on the map
function onClick(evt){
	alert(evt.latlng);
};
map.addEventListener('click', onClick);
