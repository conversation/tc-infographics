// GLOBAL VARS
var TC_VARS = {
    currentView : 'fastest',
    winWidth : 756,
    winHeight : 600
}

// GLOBAL CONSTS
var TC_CONST = {
    heightMultiplier : 0.5625,
    maxChartWidth : 756,
    maxChartHeight : 525,
    tooltipWidth : 160,
    tooltipPadding : 12,
    padding : 10,
    chartMargin : {top: 20, right: 20, bottom: 50, left: 40},
    tcColours : {red: '#da352a', blue: '#4a90e2', green: '#50e3c2', orange: '#f5a623', grey: '#727272'}
}


/* -------------- funtion: main menu click ---------------- */

function processMenuClick(_this) {
    var divID = jQuery(_this).attr('id');
    console.log("div id " + divID);

    // update menu
    switch(divID) {
        case 'totalCostBtn':
            $("#totalCostView").addClass('active').siblings().removeClass('active');
            $("#totalCostBtn").addClass('active').siblings().removeClass('active');            
            break;
        case 'totalMedalsBtn':
            $("#totalMedalsView").addClass('active').siblings().removeClass('active');
            $("#totalMedalsBtn").addClass('active').siblings().removeClass('active');              
            break;
        case 'costPerMedalBtn':
            $("#costPerMedalView").addClass('active').siblings().removeClass('active');
            $("#costPerMedalBtn").addClass('active').siblings().removeClass('active');             
            break;
        case 'costPerTeamBtn':
            $("#costPerTeamView").addClass('active').siblings().removeClass('active');
            $("#costPerTeamBtn").addClass('active').siblings().removeClass('active');             
            break; 
        case 'costPerMedalWeightedBtn':
            $("#costPerMedalWeightedView").addClass('active').siblings().removeClass('active');
            $("#costPerMedalWeightedBtn").addClass('active').siblings().removeClass('active');             
            break;            
    }

        
}

/* -------------- funtion: getWindwoSize ---------------- */

function getWindowSize() {
    
    //console.log("Enter getWindowSize()");
    
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    
    if (newWidth <= TC_CONST.maxChartWidth) {
        TC_VARS.winWidth = newWidth;
    } else {
        TC_VARS.winWidth = TC_CONST.maxChartWidth; 
    }
    
    if (newHeight <= TC_CONST.maxChartHeight) {
        TC_VARS.winHeight = newHeight;
    } else {
        TC_VARS.winHeight = TC_CONST.maxChartHeight; 
    }
}



/* -------------- funtion: 'main' ---------------- */

$(document).ready(function() {
    
    
    //On main menu click, update with new data    
    $(".menu div").on('click', function(e) {
        processMenuClick(this);
    });    
    
    //On menu click, update with new data    
    $(".submenu div").on('click', function(e) {
        processSubmenuClick(this);
    });
 

});