// GLOBAL VARS
var TC_VARS = {
    currentView : 'fastest',
    winWidth : 756,
    winHeight : 600
}

// GLOBAL CONSTS
var TC_CONST = {
    heightMultiplier : 0.5625,
    maxChartWidth : 754,
    maxChartHeight : 525,
    tooltipWidth : 160,
    tooltipPadding : 12,
    padding : 10,
    chartMargin : {top: 20, right: 20, bottom: 50, left: 40},
    tcColours : {red: '#da352a', blue: '#4a90e2', green: '#50e3c2', orange: '#f5a623', grey: '#727272'}
}

// iframe strings
// var table01_iframe_string = "<iframe src='//datawrapper.dwcdn.net/9NWnF/3/' scrolling='no' frameborder='0' allowtransparency='true' width='100%' height='780'></iframe>";

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

// ========================================================================= //
function processKeyButtonClick(_this) {
    var divClass = jQuery(_this).attr('class');
    //console.log("div class " + divClass);

    // update menu
    switch(divClass) {
        case 'showLegendBtn active':
            $(".hideLegendBtn").addClass('active').siblings().removeClass('active');
            $("#legend").css("display", "inline-block");            
            break;
        case 'hideLegendBtn active':
            $(".showLegendBtn").addClass('active').siblings().removeClass('active');
            $("#legend").css("display", "none");             
            break;           
    }     
}

// ========================================================================= //
// DOCUMENT READY FUNCTION 
//jQuery(document).ready(function($) {

    window.onload = function(){

    // ********************* PRIMER EXPAND BUTTON CLICK *********************
    $(".sectionButton").on('click', function(e)  {
        
        //var scroll = $(window).scrollTop();
        
        //console.log("Analysis expand button");     
        var parentClickID = jQuery(this).parent().attr('id');
            
        //console.log("Parent Div ID: " + parentClickID);
        // show-hide primer
        $("#" + parentClickID + " .sectionContent").toggleClass('hide');

        if($("#" + parentClickID + " .sectionContent").hasClass('hide')==true)
        {
            //console.log("Has class show");
            // update instructions
            $("#" + parentClickID + " .expandSymbol").empty();
            $("#" + parentClickID + " .expandSymbol").append('-');

            $("#" + parentClickID + " .expandText").empty();
            $("#" + parentClickID + " .expandText").append('close');
            
                //insert iframes of rank tables
                //$("#table-01").append(table01_iframe_string); 
            
        } else {
            //console.log("No class show");
            // update instructions
            $("#" + parentClickID + " .expandSymbol").empty();
            $("#" + parentClickID + " .expandSymbol").append('+');

            $("#" + parentClickID + " .expandText").empty();
            $("#" + parentClickID + " .expandText").append('expand'); 
            
        }
        //$('body, html', parent.document).animate({ scrollTop: 0 },200);
       
        e.preventDefault();
    });
    
    
    // ********************* PRIMER BOTTOM CLOSE CLICK *********************
    $(".bottomCloseBtn").on('click', function(e)  {
        var parentContainer = jQuery(this).parent().parent().attr('id');
        //console.log("Parent Div ID: " + parentContainer);
        
        // show-hide primer
        $("#" + parentContainer + " .sectionContent").toggleClass('hide');
        
               // var scroll = $(window).scrollTop();

        if($("#" + parentContainer + " .sectionContent").hasClass('hide')==true)
        {
            //console.log("Has class show");
            // update instructions
            $("#" + parentContainer + " .expandSymbol").empty();
            $("#" + parentContainer + " .expandSymbol").append('-');

            $("#" + parentContainer + " .expandText").empty();
            $("#" + parentContainer + " .expandText").append('close');             
            
        } else {
            //console.log("No class show");
            // update instructions
            $("#" + parentContainer + " .expandSymbol").empty();
            $("#" + parentContainer + " .expandSymbol").append('+');

            $("#" + parentContainer + " .expandText").empty();
            $("#" + parentContainer + " .expandText").append('expand'); 
            
        }
        // close the legend/key window if open
        //$(".showLegendBtn").addClass('active').siblings().removeClass('active');
        //$("#legend").css("display", "none"); 
        
        //$('body, html', parent.document).animate({ scrollTop: 0 },200);        
        //e.preventDefault();
            
    });  
    
    
    // ********************* TABS BUTTON CLICK *********************
    // Gender tabs click - normal screen
    $('.tab-links a').on('click', function(e)  {
        var currentTab = jQuery(this).attr('href');
        //console.log(currentTab);
 
        // Show/Hide Tabs
        $(currentTab).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
        

    });

    // ********************* LEGEND/KEY BUTTON CLICK *********************    
    //On legend-key menu click, update with new data    
    $(".show-hide-buttons div").on('click', function(e) {
        console.log("Key button clicked");
        processKeyButtonClick(this);
    });

    // ********************* WINDOW RESIZE *********************
    // add/remove classes everytime the window resize event fires
    $(window).resize(function(){
	    var newWidth = $(window).width();
        var newHeight = $(window).height();

        //console.log("width: " + newWidth + ", height: " + newHeight);
        
    });
    
    // close section content tab to hide datawrapper charts
    // NOTE: Need to load datawrapper charts into visible div, or else we get <svg> negative height attribute errors
    $(".sectionContent").addClass("hide");
};