/*
 * WEB VISUALIZATION OF THE POPULATION SPATIAL INDICATOR FOR IDENTIFYING EMERGENCY SETTINGS IN THE EASTERN RIFT OF AFRICA
 */

// BASEMAPS
var map = L.map('map').setView([-0.45, 32.0], 7);

var topographicLayer = L.esri.basemapLayer("Topographic").addTo(map);
var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var BaseMaps = {
    "OpenStreetMap": osmLayer,
	"Topographic": topographicLayer
};

//set dynamic styling
var LogBreaks = [0.01, 0, 1, 3, 6, 10, 20, 30, 50, 100]
var Colors = ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"];

function ShapeColor(d) {
    for(let i = 1; i < LogBreaks.length; i++) {
        if(d > LogBreaks[i] && d <= LogBreaks[i+1]) {
            return Colors[i];
        }
    }
}

function SudBaseStyle (feature) {
    return {
        fillColor: ShapeColor(feature.properties.idp_perc),
        fillOpacity: 0.7,
        color: "black",
        weight: 0.3,
        opacity: 1
    }
}

function NordBaseStyle (feature) {
    return {
        fillColor: ShapeColor(feature.properties.idp_perc),
        fillOpacity: 0.7,
        color: "black",
        weight: 0.3,
        opacity: 1
    }
}

function BurundiBaseStyle (feature) {
    return {
        fillColor: ShapeColor(feature.properties.pop_perc),
        fillOpacity: 0.7,
        color: "black",
        weight: 0.3,
        opacity: 1
    }
}

function UgandaBaseStyle (feature) {
    return {
        fillColor: ShapeColor(feature.properties.pop_perc),
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

        // layer.on({
        //     mouseover: function() {
        //         layer.openPopup();
        //         this.setStyle({
        //             weight: 3,
        //             color: "yellow", 
        //             fillOpacity: 0.01
        //         })
        //     }, 
        //     mouseout: function(){
        //         layer.closePopup();
        //         this.setStyle({
        //             color: 'grey',
        //             fillOpacity: 0
        //         })
        //     }
        // })
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
        // layer.on({
        //     mouseover: function() {
        //         layer.openPopup();
        //         this.setStyle({
        //             weight: 3,
        //             color: "yellow", 
        //             fillOpacity: 0.01
        //         })
        //     }, 
        //     mouseout: function(){
        //         layer.closePopup();
        //         this.setStyle({
        //             color: 'grey', 
        //             fillOpacity: 0
        //         })
        //     }
        // })
    }
});
UgandaBoundary.addTo(map);

var SudKivuBoundary = L.geoJson(Sud_Kivu, {
    style: SudBaseStyle, 
    onEachFeature: function(feature, layer) {
        var div = $("<div class='popup'>" + //style='width: 200px; height: 200px;'
                    'Name: ' + feature.properties.name + '<br>' +
                    'Population Percentage: ' + feature.properties.idp_perc + '%' + '<br>' +
                    'Affected Population: ' + formatNumber(Math.round(feature.properties.pd_is_dans)) + '<br>' + 
                    'Total Population: ' + formatNumber(Math.round(feature.properties.population)) +
                    "<svg/></div>")[0]
        layer.bindPopup(div);

        // if ( feature.properties.name==="Fizi") {
        //     const margin = 5;
        //     const width = 100 - 2 * margin;
        //     const height = 100 - 2 * margin;

        //     var svg = d3.select("div").select("svg")
        //     const chart = svg.append('g')
        //         .attr("transform", `translate(${margin}, ${margin})`);
        //     const yScale = d3.scaleLinear()
        //         .range([height, 0])
        //         .domain([0, 100])
        //     chart.append('g')
        //         .call(d3.axisLeft(yScale));
            
        //     const xScale = d3.scaleBand()
        //         .range([0, width])
        //         .domain(sample.map((s) => s.territoire))
        //         .padding(0.2)

        //     // chart.append('g')
        //     //     .attr('transform', `translate(0, ${height})`)
        //     //     .call(d3.axisBottom(xScale))

        //     // var svg = d3.select("div").select("svg").attr("width", 200).attr("height", 200);
        //     // svg.append("rect").attr("width", 200).attr("height", 200).style("fill", "lightBlue");
        //     // var yScale = d3.scaleLinear().range([100, 0]).domain([0, 100]);

        // };
        // layer.on({
        //     mouseover: function() {
        //         layer.openPopup();
        //         this.setStyle({
        //             weight: 3,
        //             color: "yellow", 
        //             fillOpacity: 0.01
        //         })
        //     }, 
        //     mouseout: function(){
        //         layer.closePopup();
        //         this.setStyle({
        //             color: 'grey',
        //             fillOpacity: 0
        //         })
        //     }
        // })
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
        // layer.on({
        //     mouseover: function() {
        //         layer.openPopup();
        //         this.setStyle({
        //             weight: 3,
        //             color: "yellow", 
        //             fillOpacity: 0.01
        //         })
        //     }, 
        //     mouseout: function(e){
        //         layer.closePopup();
        //         this.setStyle({
        //             NordBaseStyle
        //         });
        //     }
        // })
    }
});
NordKivuBoundary.addTo(map);

// SET LEGEND
var legend = L.control({position: "bottomleft"});
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML = 
        '<b>IDP Population Percentage</b><br>' +
        '<div style=background-color:#fff7ec></div>0.01% - 0%<br>' +
        '<div style=background-color:#fee8c8></div>0% - 1%<br>' +
        '<div style=background-color:#fdd49e></div>1% - 3%<br>' +
        '<div style=background-color:#fdbb84></div>3% - 6%<br>' +
        '<div style=background-color:#fc8d59></div>6% - 10%<br>' +
        '<div style=background-color:#ef6548></div>10% - 20%<br>' +
        '<div style=background-color:#d7301f></div>20% - 30%<br>' +
        '<div style=background-color:#b30000></div>30% - 50%<br>' +
        '<div style=background-color:#7f0000></div> 50% - 100%<br>' +
        '<div style=background-color:#808080></div> NULL <br>';
    return div;
}
legend.addTo(map)

var features = {
    "Burundi Population Percentage": BurundiBoundary,
    "Uganda Population Percentage": UgandaBoundary,
    "Nord Kivu Population Percentage": NordKivuBoundary, 
    "Sud Kivu Population Percentage": SudKivuBoundary
};

L.control.layers(BaseMaps, features, {position:'topright'}).addTo(map);
L.control.scale({position: 'bottomright'}).addTo(map);