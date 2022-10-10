/*
 * WEB VISUALIZATION OF THE POPULATION SPATIAL INDICATOR FOR IDENTIFYING EMERGENCY SETTINGS IN THE EASTERN RIFT OF AFRICA
 */

// BASEMAPS
var map = L.map('map').setView([-1.35, 29.53], 7);
var topographicLayer = L.esri.basemapLayer("Topographic").addTo(map);
var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
var baseMaps = {
    "OpenStreetMap": osmLayer,
	"Topographic": topographicLayer
};

//LOAD SHAPEFILES
var BaseStyle = {
 	"color": "#666699",
 	"fillColor": "#ffffff",
     "weight": 3,
     "opacity": 1
 };

var BurundiBoundary = L.geoJson(Burundi, {
    style: BaseStyle
});
BurundiBoundary.addTo(map);

var UgandaBoundary = L.geoJson(Uganda, {
    style: BaseStyle
});
UgandaBoundary.addTo(map);

var RwandaBoundary = L.geoJson(Rwanda, {
    style: BaseStyle
});
RwandaBoundary.addTo(map);

var SudKivuBoundary = L.geoJson(Sud_Kivu, {
    style: BaseStyle
});
SudKivuBoundary.addTo(map);

var NordKivuBoundary = L.geoJson(Nord_Kivu, {
    style: BaseStyle
});
NordKivuBoundary.addTo(map);

// Set the Style of the Park Elements
var parkStyle = {
    "color": "#31B404", 
    "weight": 3,
    "opacity": 0.90
};

// Set the Icons of the Parks Elements

// var parkIcon = L.icon({
//     iconUrl: "./css/images/park_3.svg",
//     iconSize: [25, 35]
// });


// Call in the Geometry data using the GeoJson method
// var parksArea = L.geoJson(Parks,
//     {style:parkStyle});
// parksArea.addTo(map);

//var clust_mark = L.getMarkerClusterGroup();


//Calling in and styling the Park Point Data set using the geoJson method
// var parksPoint = L.geoJson(parksPoint, { 
//     pointToLayer: function(feature, latlng) {
//         return L.marker(latlng, {icon:parkIcon, title:"Leisure Park"});
//     }, 
//     onEachFeature: function(feature, layer) {
//         // if (layer instanceof L.Marker) {
//         //     layer.setIcon(parkIcon)
//         // }
//         layer.bindPopup("Name: " + feature.properties.name + "<br />" + "Land Use: " 
//         + feature.properties.landuse + "<br/>" + "Access: " + feature.properties.access), 
        
//         // Add Mouse-over Effect
//         layer.on({
//             mouseover: function(){
//             layer.openPopup();
//             this.setStyle({radius: 20, color: 'yellow'});
//             },
//             mouseout: function(){
//             layer.closePopup();
//             this.setStyle({color: 'blue'});
//         }})
// }}).addTo(map);

// clust_mark.addLayer(parksPoint)
// map.fitBounds(clust_mark.getBounds());

// Addin the Control Layer -- contains the BaseMap and the Features Layers


var features = {
    "Burundi": BurundiBoundary,
    "Uganda": UgandaBoundary,
    "Nord Kivu": NordKivuBoundary, 
    "Sud Kivu": SudKivuBoundary, 
    "Rwanda": RwandaBoundary
};

L.control.layers(baseMaps, features, {position:'topright'}).addTo(map);
L.control.scale({position: 'bottomright'}).addTo(map);

// // Adding Basic Interactivity
// //Get the Coordinate of any where you click on the map
// function onClick(evt){
// 	alert(evt.latlng);
// };
// map.addEventListener('click', onClick);