    
// GLOBAL VARIABLES


//var info = L.control();
//var info = L.control.layers(null, null, {position: 'topright'});

// leaflet legend
var legend_yes = L.control({position: 'bottomright'});
var legend_no = L.control({position: 'bottomright'});

// set for Australia
var map = L.map('map', {
    zoomControl: false
});

// GLOBAL VARS
var TC_VARS = {
    currentWindowWidth : 754,
    currentWindowHeight : 600,
    zoomLevel : 4,
    cityZoomLevel : 10
}

const HOBART_LATLNG = [-41.87936,146.32941];
const ADELAIDE_LATLNG = [-34.92866,138.59863];
const PERTH_LATLNG = [-31.953512,115.857048];
const DARWIN_LATLNG = [-12.462827,130.841782];
const SYD_LATLNG = [-33.86785,151.20732];
const BRIS_LATLNG = [-27.470125,153.021072]
const MELB_LATLNG = [-37.814,144.96332];
const AUST_LATLNG = [-40.00,133.00];

/* -------------------------------------------------------------------------------------- */

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

/* -------------------------------------------------------------------------------------- */

function resetHighlight(e) {
    //geojson.resetStyle(e.target);
    var layer = e.target;
    layer.setStyle({
        weight: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.75
    });    
}

/* -------------------------------------------------------------------------------------- */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* -------------------------------------------------------------------------------------- */
function getYesColor(d) {
    return  d > 90 ? '#7f2704' :
            d > 80 ? '#a63603' :
            d > 70 ? '#d94801' :
            d > 60 ? '#f16913' :
            d > 50 ? '#fd8d3c' :
            d > 40 ? '#fdae6b' :
            d > 30 ? '#fdd0a2' :
            d > 20 ? '#fee6ce' :
                     '#fff5eb';
}

/* -------------------------------------------------------------------------------------- */
function getDivergentColor(d) {
    return  d > 90 ? '#aa6c08' :
            d > 80 ? '#db8b0a' :
            d > 70 ? '#f5a623' :
            d > 60 ? '#f7b955' :
            d > 50 ? '#f9cd85' :
            d > 40 ? '#bdd7f4' :
            d > 30 ? '#91bced' :
            d > 20 ? '#65a1e6' :
            d > 10 ? '#4a90e2' :
                     '#2479db';
}

/* -------------------------------------------------------------------------------------- */
function getMapColor(d) {
    return  d >= 90 ? '#49006a' :
            d >= 80 ? '#ae017e' :
            d >= 70 ? '#f768a1' :
            d >= 60 ? '#fcc5c0' :
            d >= 50 ? '#fde0dd' :
            d >= 40 ? '#ccece6' :
            d >= 30 ? '#41b6c4' :
            d >= 20 ? '#65a1e6' :
            d >= 10 ? '#225ea8' :
                     '#081d58';
}

/* -------------------------------------------------------------------------------------- */

//legend_yes.onAdd = function (map) {
//
//    var div = L.DomUtil.create('div', 'info legend'),
//        grades = [10, 20, 30, 40, 50, 60, 70, 90],
//        labels = [];
//
//    // loop through our density intervals and generate a label with a colored square for each interval
//    for (var i = 0; i < grades.length; i++) {
//        div.innerHTML +=
//            '<i style="background:' + getYesColor(grades[i] + 1) + '"></i> ' +
//            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//    }
//    return div;
//};

/* -------------------------------------------------------------------------------------- */
// divergent colour scheme
legend_yes.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0,10, 20, 30, 40, 50, 60, 70, 80, 90],
        labels = ["<strong>Yes vote %</strong><br>"];

    div.innerHTML += labels;

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getDivergentColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + (grades[i + 1] - 1) + '<br>' : '&ndash;100');
    }
        

    return div;
};

/* -------------------------------------------------------------------------------------- */

legend_no.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [10, 20, 30, 40, 50, 60, 70, 90],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getNoColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

/* -------------------------------------------------------------------------------------- */

function styleYesLayer(feature) {
    if (typeof(feature.properties.PercentageYes)!='undefined')
    {
        return {
            fillColor: getDivergentColor(parseFloat(feature.properties.PercentageYes)),
            fillOpacity: 0.75,
            weight: 1,
            opacity: 0.75,
            dashArray: '3',
            color: 'white'
        };
    } else {
        return {
            fillColor: 'none',
            fillOpacity: 0.75,
            weight: 1,
            opacity: 0.75,
            dashArray: '3',
            color: 'black'
        };      
    }
}

/* -------------------------------------------------------------------------------------- */

function processSydButtonClick(_this) {
    var divID = jQuery(_this).attr('id');
    //console.log("div id " + divID);


    // update menu
    switch(divID) {
        case 'showSydBtn':
            map.setView([SYD_LAT,SYD_LONG],10);
            $("#hideMelbBtn").addClass('active').siblings().removeClass('active');          
            break;
        case 'hideSydBtn':
            map.setView([AUST_LAT, AUST_LONG], 4);
            $("#showSydBtn").addClass('active').siblings().removeClass('active');            
            break;           
    }
}

/* -------------------------------------------------------------------------------------- */

function processMelbButtonClick(_this) {
    var divID = jQuery(_this).attr('id');
    //console.log("div id " + divID);


    // update menu
    switch(divID) {
        case 'showMelbBtn':
            map.setView([MELB_LAT,MELB_LONG],10);
            $("#hideMelbBtn").addClass('active').siblings().removeClass('active');          
            break;
        case 'hideMelbBtn':
            map.setView([AUST_LAT, AUST_LONG], 4);
            $("#showMelbBtn").addClass('active').siblings().removeClass('active');            
            break;           
    }
}

/* -------------------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------------------- */

function processZoomTo(_this) {
    var divID = jQuery(_this).attr('id');
   // update map view
    switch(divID) {
        case 'melbourne':
            map.setView(MELB_LATLNG,TC_VARS.cityZoomLevel);          
            break;
        case 'sydney':
            map.setView(SYD_LATLNG,TC_VARS.cityZoomLevel);         
            break;
        case 'brisbane':
            map.setView(BRIS_LATLNG,TC_VARS.cityZoomLevel);         
            break;
        case 'darwin':
            map.setView(DARWIN_LATLNG,(TC_VARS.cityZoomLevel-1));         
            break;
        case 'perth':
            map.setView(PERTH_LATLNG,TC_VARS.cityZoomLevel);         
            break;
        case 'adelaide':
            map.setView(ADELAIDE_LATLNG,TC_VARS.cityZoomLevel);         
            break;
        case 'hobart':
            map.setView(HOBART_LATLNG,(TC_VARS.cityZoomLevel-3));         
            break;             
        case 'australia':
            map.setView(AUST_LATLNG, TC_VARS.zoomLevel);         
            break;             
    }    
}

/* -------------------------------------------------------------------------------------- */

function zoomBtnClick() {
    document.getElementById("myDropdown").classList.toggle("show");
}

/* -------------------------------------------------------------------------------------- */
function processResults() {
    // vote results layer
    var yesVoteResult = L.geoJson(null, {
        style: styleYesLayer,
        onEachFeature: function(feature, layer) { //below code will be executed for each item in the layer           
            // build display text for onclick event
            var yesPopupText = "";
            if (feature.properties.Elect_div) {
                yesPopupText = "<div id='popup'><div class='division-name'>" + feature.properties.Elect_div + "</div>";
                if(feature.properties.PercentageYes) {
                    yesPopupText += "<div><span class='category'>Yes: </span><span class='value'>" + parseFloat(feature.properties.PercentageYes).toFixed(1) + "%</span></div>";
                }
                if(feature.properties.PercentageNo) {
                    yesPopupText += "<div><span class='category'>No: </span><span class='value'>" + parseFloat(feature.properties.PercentageNo).toFixed(1) + "%</span></div>";
                } 
                if(feature.properties.ResponseClear) {
                    yesPopupText += "<div><span class='category participation'>Clear responses: </span><span class='value participation'>" + parseFloat(feature.properties.ResponseClear).toFixed(1) + "%</span></div>";
                }
                if(feature.properties.ResponseNotClear) {
                    yesPopupText += "<div><span class='category participation'>Response not clear: </span><span class='value participation'>" + parseFloat(feature.properties.ResponseNotClear).toFixed(1) + "%</span></div>";
                }
                if(feature.properties.NonResponding) {
                    yesPopupText += "<div><span class='category participation'>Non responding: </span><span class='value participation'>" + parseFloat(feature.properties.NonResponding).toFixed(1) + "%</span></div>";
                }                 
            }
            // bind details to leaflet popup/tooltip
            layer.bindPopup(yesPopupText);
            
            // listen for hover event
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
            });            
        } // end onEachFeature
    });
    
    return yesVoteResult;

}

/* -------------------------------------------------------------------------------------- */

function updateMap() {
    // get current screen and div dimensions
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();

    // set zoom level
    if (screenWidth > 500) {
        TC_VARS.zoomLevel = 4;
        TC_VARS.cityZoomLevel = 10;
        
        // add legend to map
        legend_yes.addTo(map);
        
    } else {
        TC_VARS.zoomLevel = 3;
        TC_VARS.cityZoomLevel = 8;
        map.removeControl(legend_yes);
    }
    
    // set default map view to Australia
    map.setView(AUST_LATLNG, TC_VARS.zoomLevel);   
       
}

/* -------------------------------------------------------------------------------------- */

function initMap() {
    // get current screen and div dimensions
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();

    // set zoom level
    if (screenWidth > 500) {
        TC_VARS.zoomLevel = 4;
        TC_VARS.cityZoomLevel = 10;
        // add legend to map
        legend_yes.addTo(map);
        
    } else {
        TC_VARS.zoomLevel = 3;
        TC_VARS.cityZoomLevel = 9;
        map.removeControl(legend_yes);
    }
    
    // set default map view to Australia
    map.setView(AUST_LATLNG, TC_VARS.zoomLevel);
    
    // map bounds to Australia limits
    var bounds = [
        [-6, 100], // Southwest coordinates
        [-46, 180]  // Northeast coordinates
    ];    
        
    // set map bounds
    map.setMaxBounds(bounds);    
    
    map.options.maxZoom = 10;
    map.options.minZoom = 2;
    
    //add zoom control with your options
    new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);    
       
}
/* -------------------------------------------------------------------------------------- */

$('document').ready(function() {
    // initialize the map zoom level
    initMap();
    
    var yesVoteResult = processResults();

    // Open topojson file using Leaflet-Omnivore (from Mapbox)
    omnivore.topojson('data/results-ced.topo.json', null, yesVoteResult).addTo(map);

    
    //On main menu click, update with new data    
//    $(".show-hide-buttons div").on('click', function(e) {
//        processKeyButtonClick(this);
//    });     
    
    //On main menu click, update with new data    
    $(".dropbtn").on('click', function(e) {
        zoomBtnClick(this);
    });
    
    //On main menu click, update with new data    
    $("#myDropdown div").on('click', function(e) {
        processZoomTo(this);
    });
    
    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
    
    // on window resize, update chart
    // debounce so we wait until user completes screen resize
    $(window).on('resize', _.debounce(function() {    
        updateMap();
    }, 200)); 
    
});