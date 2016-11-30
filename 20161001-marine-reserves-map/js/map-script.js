    
// GLOBAL VARIABLES


var geojson;
//var info = L.control();
var info = L.control.layers(null, null, {position: 'topleft'});

// set for Australia
var map = L.map('map', {
    zoomControl: false
});
    
var    topoLayer = new L.TopoJSON(),
    $reserveName = $('.reserve-name-hover');


// GLOBAL VARS
var TC_VARS = {
    winWidth : 756,
    winHeight : 600
}

// GLOBAL CONSTS
var TC_CONST = {
    tcColours : {red: '#da352a', blue: '#4a90e2', green: '#50e3c2', orange: '#f5a623', grey: '#727272'}
}

/*
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = (props ?
        "<div class='name'>" + props.MPA_NAME 
         + " Marine Reserve"
         + "</div><div class='size'>" + parseFloat(props.Area_km2).toFixed(2) + " km<sup>2</sup>"
         + "</div><div class='region'>" + props.Network
        : 'Click on a reserve to see details');
};
*/


info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function createZonesDiv (zonesArray) {
    var zonesDiv = "";
    zonesDiv = "<table class='zone-table'><tr><th>Zones in reserve</th><th>Proclaimed (%)</th> <th>Recommended (%)</th></tr>";
    for (i=0; i < zonesArray.length; i++){
       zonesDiv = zonesDiv + "<tr><td><div class='zone-table-box' id='" + zonesArray[i][3] + "'></div>" + zonesArray[i][0] + "</td><td>" + zonesArray[i][1] + "%</td><td>" + + zonesArray[i][2] + "%</td></tr>"
    }    
    zonesDiv = zonesDiv + "</table>";
    return zonesDiv;
}

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    
    var zonesArray = [];
    var zonesTable = "";
    
    if (props) {
        //console.log ("there are props");
        var reserveName = props.RESNAME;
        //console.log (props.RESNAME);
        
        if (props.TOTAL_AREA_KM2) {
            var totalArea = parseFloat(props.TOTAL_AREA_KM2).toFixed(2);
            totalArea = numberWithCommas(totalArea);  
        }
        
        if (props.AREA_KM2) {
            var currentZoneArea = parseFloat(props.AREA_KM2).toFixed(2);
            currentZoneArea = numberWithCommas(currentZoneArea);  
        }
        
        if (props.NATLEGEND) {
            var currentZone = props.NATLEGEND;
            
            //var currentZoneClean = currentZone.replace(/\bZ\S+/ig,"");
            //var currentZoneClean = currentZone.replace();
            //console.log("current zone " + currentZoneClean);
                                                       
        }
        
        if (props.SZ_PROCLAIMED||props.SZ_RECOMMENDED){
            var szElement = [];
            szElement[0] = "Sanctuary";
            szElement[1] = props.SZ_PROCLAIMED;
            szElement[2] = props.SZ_RECOMMENDED;
            szElement[3] = "sanctuary";
            zonesArray.push(szElement);
        }        

        if (props.MNPZ_PROCLAIMED||props.MNPZ_RECOMMENDED){
            var mnpzElement = [];
            mnpzElement[0] = "Marine national park";
            mnpzElement[1] = props.MNPZ_PROCLAIMED;
            mnpzElement[2] = props.MNPZ_RECOMMENDED;
            mnpzElement[3] = "national-park";
            zonesArray.push(mnpzElement);
        }
        
        if (props.CPZ_PROCLAIMED||props.CPZ_RECOMMENDED){
            var cpzElement = [];
            cpzElement[0] = "Conservation park";
            cpzElement[1] = props.CPZ_PROCLAIMED;
            cpzElement[2] = props.CPZ_RECOMMENDED;
            cpzElement[3] = "conservation";
            zonesArray.push(cpzElement);
        } 
        
        if (props.HPZCS_PROCLAIMED||props.HPZCS_RECOMMENDED){
            var hpzcsElement = [];
            hpzcsElement[0] = "Habitat protection (Coral Sea)";
            hpzcsElement[1] = props.HPZCS_PROCLAIMED;
            hpzcsElement[2] = props.HPZCS_RECOMMENDED;
            hpzcsElement[3] = "habitat-protection-coral-sea";
            zonesArray.push(hpzcsElement);
        }        
        
        if (props.HPZS_PROCLAIMED||props.HPZS_RECOMMENDED){
            var hpzsElement = [];
            hpzsElement[0] = "Habitat protection (seamounts)";
            hpzsElement[1] = props.HPZS_PROCLAIMED;
            hpzsElement[2] = props.HPZS_RECOMMENDED;
            hpzsElement[3] = "habitat-protection-seamounts";
            zonesArray.push(hpzsElement);
        } 
        
        if (props.HPZ_PROCLAIMED||props.HPZ_RECOMMENDED){
            var hpzElement = [];
            hpzElement[0] = "Habitat protection";
            hpzElement[1] = props.HPZ_PROCLAIMED;
            hpzElement[2] = props.HPZ_RECOMMENDED;
            hpzElement[3] = "habitat-protection";
            zonesArray.push(hpzElement);
        }
        
        if (props.HPZR_PROCLAIMED||props.HPZR_RECOMMENDED){
            var hpzrElement = [];
            hpzrElement[0] = "Habitat protection (reefs)";
            hpzrElement[1] = props.HPZR_PROCLAIMED;
            hpzrElement[2] = props.HPZR_RECOMMENDED;
            hpzrElement[3] = "habitat-protection-reefs";
            zonesArray.push(hpzrElement);
        }        
        
        if (props.HPZLH_PROCLAIMED||props.HPZLH_RECOMMENDED){
            var hpzlhElement = [];
            hpzlhElement[0] = "Habitat protection (Lord Howe)";
            hpzlhElement[1] = props.HPZLH_PROCLAIMED;
            hpzlhElement[2] = props.HPZLH_RECOMMENDED;
            hpzlhElement[3] = "habitat-protection-lord-howe";
            zonesArray.push(hpzlhElement);
        }        
        
        if (props.MUZ_PROCLAIMED||props.MUZ_RECOMMENDED){
            var muzElement = [];
            muzElement[0] = "Multiple use";
            muzElement[1] = props.MUZ_PROCLAIMED;
            muzElement[2] = props.MUZ_RECOMMENDED;
            muzElement[3] = "multiple-use";
            zonesArray.push(muzElement);
        }
        
        if (props.MUZA_PROCLAIMED||props.MUZA_RECOMMENDED){
            var muzaElement = [];
            muzaElement[0] = "Multiple use (A)";
            muzaElement[1] = props.MUZA_PROCLAIMED;
            muzaElement[2] = props.MUZA_RECOMMENDED;
            muzaElement[3] = "multiple-use-a";
            zonesArray.push(muzaElement);
        }        
        
        if (props.SPZ_PROCLAIMED||props.SPZ_RECOMMENDED){
            var spzElement = [];
            spzElement[0] = "Special purpose";
            spzElement[1] = props.SPZ_PROCLAIMED;
            spzElement[2] = props.SPZ_RECOMMENDED;
            spzElement[3] = "special-purpose";
            zonesArray.push(spzElement);
        }
        
        if (props.SPZA_PROCLAIMED||props.SPZA_RECOMMENDED){
            var spzaElement = [];
            spzaElement[0] = "Special purpose (A)";
            spzaElement[1] = props.SPZA_PROCLAIMED;
            spzaElement[2] = props.SPZA_RECOMMENDED;
            spzaElement[3] = "special-purpose-a";
            zonesArray.push(spzaElement);
        }        
        
        if (props.SPZB_PROCLAIMED||props.SPZB_RECOMMENDED){
            var spzbElement = [];
            spzbElement[0] = "Special purpose (B)";
            spzbElement[1] = props.SPZB_PROCLAIMED;
            spzbElement[2] = props.SPZB_RECOMMENDED;
            spzbElement[3] = "special-purpose-b";
            zonesArray.push(spzbElement);
        }
        
        if (props.SPZC_PROCLAIMED||props.SPZC_RECOMMENDED){
            var spzcElement = [];
            spzcElement[0] = "Special purpose (C)";
            spzcElement[1] = props.SPZC_PROCLAIMED;
            spzcElement[2] = props.SPZC_RECOMMENDED;
            spzcElement[3] = "special-purpose-c";
            zonesArray.push(spzcElement);
        } 
        
        if (props.RUZ_PROCLAIMED||props.RUZ_RECOMMENDED){
            var ruzElement = [];
            ruzElement[0] = "Recreational use";
            ruzElement[1] = props.RUZ_PROCLAIMED;
            ruzElement[2] = props.RUZ_RECOMMENDED;
            ruzElement[3] = "recreational-use";
            zonesArray.push(ruzElement);
        }
        
        if (props.GUZ_PROCLAIMED||props.GUZ_RECOMMENDED){
            var guzElement = [];
            guzElement[0] = "General use";
            guzElement[1] = props.GUZ_PROCLAIMED;
            guzElement[2] = props.GUZ_RECOMMENDED;
            guzElement[3] = "general-use";
            zonesArray.push(guzElement);
        }        
        
        //console.log("Total Area: " + totalArea);
        //console.log("Array length: " + zonesArray.length)
        //console.log("MNPZ proclaimed: " + zonesArray[0][0]);
        //console.log("MNPZ Recommended: " + zonesArray[0][1]);
        
        if (zonesArray.length != 0)
        {
            zonesTable = createZonesDiv(zonesArray);
        } else {
            zonesTable = "<div class='no-change-text'>No changes recommended</div>"
        }
        
        console.log("Zones Table: " + zonesTable);
    }
    
    // parseFloat(props.TOTAL_AREA_KM2).toFixed(2)
    
    this._div.innerHTML = (props ?
        "<div class='name'>" + props.RESNAME 
         + " Marine Reserve</div><div class='size'>" + totalArea + " km<sup>2</sup></div>"
         + "<div class='region'>" + props.NETNAME + "</div>"
         + "<div class='zone-name'>" + currentZone + "</div>"
         + "<div class='zone-area'>" + currentZoneArea + " km<sup>2</sup></div>"
         + zonesTable
        : 'Click on a reserve to see details');
};


function getColor(zone) {
    switch(zone) {
        case 'Sanctuary Zone (IUCN Ia)':
            return '#ffb3b3'; //pink
            break;
        case 'Marine National Park Zone (IUCN II)':
            return '#53c653'; // green
            break;
        case 'Recreational Use Zone (IUCN IV)':
            return '#ffcc33'; // orange
            break;
        case 'Habitat Protection Zone (IUCN IV)':
            return '#ffff80'; // yellow
            break;
        case 'Habitat Protection Zone (Reefs) (IUCN IV)':
            return '#b3e6b3'; // light green
            break;
        case 'Habitat Protection Zone (Lord Howe) (IUCN IV)':
            return '#e6e600'; // tc green
            break;            
        case 'Special Purpose Zone (IUCN VI)':
            return '#2479db'; // darker blue
            break;
        case 'Special Purpose Zone (A) (IUCN VI)':
            return '#1d61af'; // dark blue 1
            break;
        case 'Special Purpose Zone (B) (IUCN VI)':
            return '#19559a'; // dark blue 2
            break;
        case 'Special Purpose Zone (C) (IUCN VI)':
            return '#154984'; // dark blue 3
            break;        
        case 'Multiple Use Zone (IUCN VI)':
            return '#a7caf1'; // light blue 1
            break;
        case 'Multiple Use Zone (A) (IUCN VI)':
            return '#91bced'; // light blue 2
            break;             
        default:
            return '#000000';
    };
    
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.NATLEGEND),
        fillOpacity: 1,
        weight: 2,
        opacity: 1,
        dashArray: '4',

    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: '#000000',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 1,
        fillOpacity: 1
    });
}

function zoomToFeature(e) {
    var layer = e.target;
    info.update(layer.feature.properties);
    map.fitBounds(e.target.getBounds());
}

function addTopoData(topoData){
    topoLayer.addData(topoData);
    topoLayer.addTo(map);
    topoLayer.setStyle(style);
    topoLayer.eachLayer(handleLayer);
}


function handleLayer(layer){

    layer.setStyle({
      fillOpacity: 1,
      color:'#555',
      weight:1,
      opacity:.25
    });
    layer.on({
        mouseover : highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature            
    });    
}


function processZoneClick(_this) {
    var zoneId = jQuery(_this).attr('id');
    //console.log("Zone div id " + zoneId);
}

function processKeyButtonClick(_this) {
    var divID = jQuery(_this).attr('id');
    //console.log("div id " + divID);

    // update menu
    switch(divID) {
        case 'showLegendBtn':
            $("#hideLegendBtn").addClass('active').siblings().removeClass('active');
            $("#legend").css("display", "inline-block");            
            break;
        case 'hideLegendBtn':
            $("#showLegendBtn").addClass('active').siblings().removeClass('active');
            $("#legend").css("display", "none");             
            break;           
    }

        
}

$('document').ready(function(){
    // initialize the map
    var mapboxAccessToken = 'pk.eyJ1IjoiZWRpdG9yaWFsLXRlYW0iLCJhIjoiQ2dCREhsUSJ9.CH7em9Q5WmOSXAy15sPwng';

    //$.getJSON('data/marine-reserves-outline.topo.json').done(addBaseMapData);
    $.getJSON('data/marine-reserves.topo.json').done(addTopoData);
    
    map.setView([-26.00, 136.00], 4);
    
    // map bounds to reserve limits
    var bounds = [
        [-6, 100], // Southwest coordinates
        [-46, 180]  // Northeast coordinates
    ];    

    // load a tile layer
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
        id: 'mapbox.light',
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 8,
        minZoom: 3
    }).addTo(map);
    

    //add zoom control with your options
    new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
    
    info.addTo(map);
    
    // ser map bounds
    map.setMaxBounds(bounds);
    
    //On main menu click, update with new data    
    $(".show-hide-buttons div").on('click', function(e) {
        processKeyButtonClick(this);
    });     
    
    //On click of a zone (in legend), show additional information    
   // $(".zone-item").on('click', function(e) {
   // });
});