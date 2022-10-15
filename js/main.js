/*
 * WEB VISUALIZATION OF THE POPULATION SPATIAL INDICATOR FOR IDENTIFYING EMERGENCY SETTINGS IN THE EASTERN RIFT OF AFRICA
 */

// BASEMAPS
var map = L.map('map').setView([-0.45, 32.0], 7);
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
     "weight": 1,
     "opacity": 0.2
 };

//  #ffffcc
//  #a1dab4
//  #41b6c4
//  #2c7fb8
//  #253494

// Set dynamic styling
// let SudBreaks = [0.090000, 3.770000, 11.460000, 27.680000, 44.850000, 54.290000];
// let SudColors = ["#fef0d9", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000"];
// function baseColor(d) {
//     for(let i = 1; i < SudBreaks.length; i++) {
//         if(d > SudBreaks[i] && d <= SudBreaks[i+1]) {
//             return SudColors[i];
//         }
//     }
// }

 function SudBaseColor(p) {
    if(p > 44.850000) return "#fef0d9";
    if(p > 27.680000) return "#fdcc8a";
    if(p > 11.460000) return "#fc8d59";
    if(p > 3.770000) return "#e34a33";
    if(p > 0.090000) return "#b30000";
    return "grey";
}

 function SudBaseStyle (feature) {
    return {
        fillColor: SudBaseColor(feature.properties.idp_perc), 
        fillOpacity: 0.7, 
        color: "black", 
        weight: 0.3, 
        opacity: 1
    }
}

function NordBaseColor(p) {
    if(p > 32.410000) return "#fef0d9";
    if(p > 22.260000) return "#fdcc8a";
    if(p > 15.280000) return "#fc8d59";
    if(p > 6.730000) return "#e34a33";
    if(p > 0.000000) return "#b30000";
    return "grey";
}

 function NordBaseStyle (feature) {
    return {
        fillColor: NordBaseColor(feature.properties.idp_perc), 
        fillOpacity: 0.7, 
        color: "black", 
        weight: 0.3, 
        opacity: 1
    }
}

function BurundiBaseColor(p) {
    if(p > 6.180000) return "#fef0d9";
    if(p > 1.701000) return "#fdcc8a";
    if(p > 0.893000) return "#fc8d59";
    if(p > 0.372000) return "#e34a33";
    if(p > 0.000000) return "#b30000";
    return "grey";
}

 function BurundiBaseStyle (feature) {
    return {
        fillColor: BurundiBaseColor(feature.properties.pop_perc), 
        fillOpacity: 0.7, 
        color: "black", 
        weight: 0.3, 
        opacity: 1
    }
}

function UgandaBaseColor(p) {
    if(p > 9.500000) return "#fef0d9";
    if(p > 7.700000) return "#fdcc8a";
    if(p > 5.800000) return "#fc8d59";
    if(p > 5.700000) return "#e34a33";
    if(p > 0.000000) return "#b30000";
    return "grey";
}

 function UgandaBaseStyle (feature) {
    return {
        fillColor: UgandaBaseColor(feature.properties.pop_perc), 
        fillOpacity: 0.7, 
        color: "black", 
        weight: 0.3, 
        opacity: 1
    }
}
// UTILITY FUNCTIONS

function formatNumber(num) {
    return num
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

function highlight_feature(e) {
    e.target.setStyle({weight: 4, color: "orange", fillOpacity: 0.4});
    e.target.bringToFront();
}

function reset_highlight(e) {
    geojson.resetStyle(e.target);
}

// DISPLAYED LAYERS
var BurundiBoundary = L.geoJson(Burundi, {
    style: BurundiBaseStyle, 
    onEachFeature: function(feature, layer) {
        layer.bindPopup(
            '<div class="popup">' +
                "Name: " + feature.properties.admin2Name + "<br>" + 
                "Population Percentage: " + feature.properties.pop_perc + "%" +  "<br>" +
                "Affected Population: " + feature.properties.IDP_info_number_affected_individuals + "<br>" +
                "Total Population: " + formatNumber(Math.round(feature.properties.bdi_admpop_2022_adm2_v3_T_TL)) +
            '</div>'
            );
        layer.addEventListener("click", highlight_feature);
        layer.addEventListener("mouseout", reset_highlight);
    }
});

BurundiBoundary.addTo(map);

var UgandaBoundary = L.geoJson(Uganda, {
    style: UgandaBaseStyle, 
    onEachFeature: function(feature, layer) {
        layer.bindPopup(
            '<div class="popup">' +
                "Name: " + feature.properties.ADM2_EN + "<br>" + 
                "Population Percentage: " + feature.properties.pop_perc + "%" +"<br>" +
                "Affected Population: " + formatNumber(Math.round(feature.properties.IDP_info_Number_of_Affected_Population_IND)) + "<br>" + 
                "Total Population: " + formatNumber(Math.round(feature.properties.uga_admpop_adm2_2022_T_TL)) +
            '</div>'
        );
        layer.addEventListener("click", highlight_feature);
        layer.addEventListener("mouseout", reset_highlight);
    }
});
UgandaBoundary.addTo(map);

var RwandaBoundary = L.geoJson(Rwanda, {
    style: BaseStyle,
    onEachFeature: function(feature, layer) {
        layer.bindPopup(
            '<div class="popup">' +
                "Name: " + feature.properties.name + "<br>" + 
                "Total Population: " + feature.properties.population);
        layer.addEventListener("click", highlight_feature);
        layer.addEventListener("mouseout", reset_highlight);
    }
});
RwandaBoundary.addTo(map);

// fetch("data/Sud_Kivu.geojson") 
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         L.geoJSON(data, {style: baseStyle}).addTo(map);
//     });

var SudKivuBoundary = L.geoJson(Sud_Kivu, {
    style: SudBaseStyle, 
    onEachFeature: function(feature, layer) {
        layer.bindPopup(
            '<div class="popup">' +
                "Name: " + feature.properties.name + "<br>" + 
                "Population Percentage: " + feature.properties.idp_perc + "%" +"<br>" +
                "Affected Population: " + formatNumber(Math.round(feature.properties.pd_is_dans)) + "<br>" + 
                "Total Population: " + formatNumber(Math.round(feature.properties.population)) +
            '</div>'
        );
        layer.addEventListener("click", highlight_feature);
        layer.addEventListener("mouseout", reset_highlight);
    }
});
SudKivuBoundary.addTo(map);

var NordKivuBoundary = L.geoJson(Nord_Kivu, {
    style: NordBaseStyle, 
    onEachFeature: function(feature, layer) {
        layer.bindPopup(
            '<div class="popup">' +
                "Name: " + feature.properties.name + "<br>" +
                "Population Percentage: " + feature.properties.idp_perc + "%" +"<br>" +
                "Affected Population: " + formatNumber(Math.round(feature.properties.pd_is_dans)) + "<br>" + 
                "Total Population: " + formatNumber(Math.round(feature.properties.Population)) +
            '</div>'
        );
        layer.addEventListener("click", highlight_feature);
        layer.addEventListener("mouseout", reset_highlight);
    }
});
NordKivuBoundary.addTo(map);

// Set the Style of the Park Elements
var parkStyle = {
    "color": "#31B404", 
    "weight": 3,
    "opacity": 0.90
};

// SET LEGEND
var legend = L.control({position: "bottomleft"});

legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML = 
        '<b>IDP Population Percentage</b><br>' +
        '<div style=background-color:#fef0d9></div>44.850000% - 54.290000%<br>' +
        '<div style=background-color:#fdcc8a></div>27.680000% - 44.850000%<br>' +
        '<div style=background-color:#fc8d59></div>11.460000% - 27.680000%<br>' +
        '<div style=background-color:#e34a33></div>3.770000% - 11.460000%<br>' +
        '<div style=background-color:#b30000></div>0.090000% - 3.770000%<br>' +
        '<div style=background-color:#808080></div> NA<br>';
    return div;
    }
legend.addTo(map)

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