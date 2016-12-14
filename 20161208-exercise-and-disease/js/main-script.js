// GLOBAL VARS
var TC_VARS = {
    currentView : 'bodymap',
    winWidth : 754,
    winHeight : 600,
    categorySelected: "all",
    currentDisease: "general",
    currentDiseaseCategory: "Other",
    previousDiseaseID: "general",
    firstClick: true,
    rtime : 0,
    timeout : false,
    delta : 200
}

// GLOBAL CONSTS
var TC_CONST = {
    tcColours : {red: '#da352a', blue: '#4a90e2', green: '#50e3c2', orange: '#f5a623', grey: '#727272'}
}


// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------

// add/remove classes everytime the window resize event fires
jQuery(window).resize(function(){
	var off_canvas_nav_display = $('.off-canvas-navigation').css('display');
	var menu_button_display = $('.main-menu-btn').css('display');
	if (off_canvas_nav_display === 'block') {			
		$("body").removeClass("three-column").addClass("small-screen");
	}
    
	if (off_canvas_nav_display === 'none') {
		$("body").removeClass("active-nav small-screen")
			.addClass("three-column");			
	}	
	
});


// ---------------------------------------------------------------
// Click events on body
function buttonEvent(disease){
    
    // get disease details from data object

    // Get details of cancer and incident rates
    
    // check if first click
    // if yes, turn off click-me attrib
    if (TC_VARS.firstClick == true) {
        //console.log("first click is true");
        $('#clickme-text').attr("class", "clickme-text disable");
        TC_VARS.firstClick = false;
    }
    
    // show highlight figure
    $("#mainFigure").empty();
    $("#mainFigure").append(data[disease].highlight);
    
    // show highlight support/short text
    $("#supportText").empty();    
    $("#supportText").append(data[disease].short); 
    
    // show main description text
    $("#descriptionText").empty();    
    $("#descriptionText").append(data[disease].description);
    
    
    $('.infobox').removeClass(TC_VARS.currentDiseaseCategory);
    
    $('.infobox').addClass(data[disease].category);


    // show source
    $("#source").empty();
    if (data[disease].link != "") {
        $("#source").append("<a href='" + data[disease].link + "' target='_blank'>" + data[disease].source);
    } else {
        $("#source").append(data[disease].source);
    }
    
    
    // make dot active
    $('#' + disease).attr("class", "disease-dot active");

    // remove focus on previous disease dot
    $("#" + TC_VARS.previousDiseaseID).blur();
    // set focus on chosen disease dot
    $("#" + disease).focus();
    
    // remove active from previous disease
    // add visited class
    if (TC_VARS.previousDiseaseID != "") {
        $('#' + TC_VARS.previousDiseaseID).attr("class", "disease-dot visited");
    }
    
    // update current disease to be one clicked
    TC_VARS.currentDisease = disease;
    
    // update current disease category
    TC_VARS.currentDiseaseCategory = data[disease].category;
    
    // set the previousDiseaseID to the disease just selected
    TC_VARS.previousDiseaseID = disease;
    
    // set the value of the disease dropdown box
    var element = document.getElementById('selectOpt');
    element.value = disease;

    event.preventDefault();
};

// ---------------------------------------------------------------
// Disease selected from dropdown

function selectDisease() {

    var myselect = document.getElementById("selectOpt");
    //console.log("Disease selected from dropdown: " + myselect.options[myselect.selectedIndex].value);
    
    // call button event:
    buttonEvent(myselect.options[myselect.selectedIndex].value);
}

// ---------------------------------------------------------------
// CATEGORY SELECT CHECKBOX FUNCTIONS
// Select All change
function categorySelectAllChange(checkbox) {
    if (checkbox.checked) {
        // show all dots
        $(".neural").css("display","inline");
        $(".psychological").css("display","inline");
        $(".cardiovascular").css("display","inline");
        $(".cancer").css("display","inline");
        $(".bone").css("display","inline");
        $(".other").css("display","inline");
        
        // turn off any other checkbox ticks
        $("#select-neural").attr("checked",false);
        $("#select-psychological").attr("checked",false);
        $("#select-cardiovascular").attr("checked",false);
        $("#select-cancer").attr("checked",false);
        $("#select-bone").attr("checked",false);
        $("#select-other").attr("checked",false);    
        
        // display general health info
        buttonEvent('general');
        
        // turn on all options for dropdown
        $("#braingroup").prop('disabled', false);        
        $("#psychgroup").prop('disabled', false);        
        $("#heartgroup").prop('disabled', false);        
        $("#bonegroup").prop('disabled', false);        
        $("#othergroup").prop('disabled', false);        
        $("#cancergroup").prop('disabled', false);
        
        // set category selected var
        TC_VARS.categorySelected = "all";
        
        // display next/prev buttons
        $("#next-btn").removeClass("disabled");
        $("#prev-btn").removeClass("disabled");
        
    } else {
        $(".neural").css("display","none");
        $(".psychological").css("display","none");
        $(".cardiovascular").css("display","none");
        $(".cancer").css("display","none");
        $(".bone").css("display","none");
        $(".other").css("display","none");
        
        // turn off all options for dropdown
        $("#braingroup").prop('disabled', true);    
        $("#psychgroup").prop('disabled', true);        
        $("#heartgroup").prop('disabled', true);        
        $("#bonegroup").prop('disabled', true);        
        $("#othergroup").prop('disabled', true);        
        $("#cancergroup").prop('disabled', true);        
        
        // set category selected var to none
        TC_VARS.categorySelected = "none";
        
        // disable next/prev buttons
        $("#next-btn").addClass("disabled");
        $("#prev-btn").addClass("disabled");        
    }
}

// Select Neural change
function categoryNeuralChange(checkbox) {
    if (checkbox.checked) {
        $(".neural").css("display","inline");
        
        // turn other dots off
        $(".psychological").css("display","none");
        $(".cardiovascular").css("display","none");
        $(".cancer").css("display","none");
        $(".bone").css("display","none");
        $(".other").css("display","none");
        
        // turn off any other checkbox ticks
        $("#select-psychological").attr("checked",false);
        $("#select-cardiovascular").attr("checked",false);
        $("#select-cancer").attr("checked",false);
        $("#select-bone").attr("checked",false);
        $("#select-other").attr("checked",false);        
        $("#select-all").attr("checked",false);
        
        // display neural event - Alzeimers
        buttonEvent('alzheimers');
        
        // turn off brain group for dropdown
        $("#braingroup").prop('disabled', false);
        
        // turn off other options for dropdown  
        $("#psychgroup").prop('disabled', true);        
        $("#heartgroup").prop('disabled', true);        
        $("#bonegroup").prop('disabled', true);        
        $("#othergroup").prop('disabled', true);        
        $("#cancergroup").prop('disabled', true);     
        
        // set category selected var
        TC_VARS.categorySelected = "neural";
        
        // disable next/prev buttons
        $("#next-btn").addClass("disabled");
        $("#prev-btn").addClass("disabled");        
        
    } else {
        $(".neural").css("display","none");
    }
}

// Select Psychological change
function categoryPsychologicalChange(checkbox) {
    if (checkbox.checked) {
        $(".psychological").css("display","inline");
        
        // turn others dots off
        $(".neural").css("display","none");
        $(".cardiovascular").css("display","none");
        $(".cancer").css("display","none");
        $(".bone").css("display","none");
        $(".other").css("display","none");
        
        // turn off any other checkbox ticks
        $("#select-neural").attr("checked",false);
        $("#select-cardiovascular").attr("checked",false);
        $("#select-cancer").attr("checked",false);
        $("#select-bone").attr("checked",false);
        $("#select-other").attr("checked",false);
        $("#select-all").attr("checked",false);
        
        // display psychological event - optimism
        buttonEvent('optimism');

        // turn off psych group for dropdown
        $("#psychgroup").prop('disabled', false);
        
        // turn off all options for dropdown
        $("#braingroup").prop('disabled', true);          
        $("#heartgroup").prop('disabled', true);        
        $("#bonegroup").prop('disabled', true);        
        $("#othergroup").prop('disabled', true);        
        $("#cancergroup").prop('disabled', true);

        // set category selected var
        TC_VARS.categorySelected = "psychological";
        
        // disable next/prev buttons
        $("#next-btn").addClass("disabled");
        $("#prev-btn").addClass("disabled");           
        
    } else {
        $(".psychological").css("display","none");
    }
}

// Select Cardiovascular change
function categoryCardiovascularChange(checkbox) {
    if (checkbox.checked) {
        $(".cardiovascular").css("display","inline");

        // turn other dots off
        $(".neural").css("display","none");
        $(".psychological").css("display","none");
        $(".cancer").css("display","none");
        $(".bone").css("display","none");
        $(".other").css("display","none");
        
        // turn off any other checkbox ticks
        $("#select-neural").attr("checked",false);
        $("#select-psychological").attr("checked",false);
        $("#select-cancer").attr("checked",false);
        $("#select-bone").attr("checked",false);
        $("#select-other").attr("checked",false);
        $("#select-all").attr("checked",false);
        
        // display cardiovascular event - Stroke
        buttonEvent('stroke');
        
        // turn off heart group for dropdown
        $("#heartgroup").prop('disabled', false);

        // turn off all options for dropdown
        $("#braingroup").prop('disabled', true);    
        $("#psychgroup").prop('disabled', true);               
        $("#bonegroup").prop('disabled', true);        
        $("#othergroup").prop('disabled', true);        
        $("#cancergroup").prop('disabled', true);
        
        // set category selected var
        TC_VARS.categorySelected = "cardiovascular";
        
        // disable next/prev buttons
        $("#next-btn").addClass("disabled");
        $("#prev-btn").addClass("disabled");           
    } else {
        $(".cardiovascular").css("display","none");

    }
}

// Select Cancer change
function categoryCancerChange(checkbox) {
    if (checkbox.checked) {
        $(".cancer").css("display","inline");

        // turn other dots off
        $(".neural").css("display","none");
        $(".psychological").css("display","none");
        $(".cardiovascular").css("display","none");
        $(".bone").css("display","none");
        $(".other").css("display","none");
        
        // turn off any other checkbox ticks
        $("#select-neural").attr("checked",false);
        $("#select-psychological").attr("checked",false);
        $("#select-cardiovascular").attr("checked",false);
        $("#select-bone").attr("checked",false);
        $("#select-other").attr("checked",false);
        $("#select-all").attr("checked",false);
        
        // display cancer event - Head and neck
        buttonEvent('head');
        
        // turn off cancer group for dropdown
        $("#cancergroup").prop('disabled', false);
        
        // turn off all options for dropdown
        $("#braingroup").prop('disabled', true);    
        $("#psychgroup").prop('disabled', true);        
        $("#heartgroup").prop('disabled', true);        
        $("#bonegroup").prop('disabled', true);        
        $("#othergroup").prop('disabled', true);

        // set category selected var
        TC_VARS.categorySelected = "cancer";
        
        // disable next/prev buttons
        $("#next-btn").addClass("disabled");
        $("#prev-btn").addClass("disabled");   
        
    } else {
        $(".cancer").css("display","none");
        $("#select-all").checked = false;
    }
}

// Select Bone change
function categoryBoneChange(checkbox) {
    if (checkbox.checked) {
        $(".bone").css("display","inline");

        // turn other dots off
        $(".neural").css("display","none");
        $(".psychological").css("display","none");
        $(".cardiovascular").css("display","none");
        $(".cancer").css("display","none");
        $(".other").css("display","none");
        
        // turn off any other checkbox ticks
        $("#select-neural").attr("checked",false);
        $("#select-psychological").attr("checked",false);
        $("#select-cardiovascular").attr("checked",false);
        $("#select-cancer").attr("checked",false);
        $("#select-other").attr("checked",false);
        $("#select-all").attr("checked",false);
        
        // display bone event - osteoarthritis
        buttonEvent('osteoarthritis');

        // turn off bone group for dropdown
        $("#bonegroup").prop('disabled', false);
        
        // turn off all options for dropdown
        $("#braingroup").prop('disabled', true);    
        $("#psychgroup").prop('disabled', true);        
        $("#heartgroup").prop('disabled', true);       
        $("#othergroup").prop('disabled', true);        
        $("#cancergroup").prop('disabled', true);

        // set category selected var
        TC_VARS.categorySelected = "bone";
        
        // disable next/prev buttons
        $("#next-btn").addClass("disabled");
        $("#prev-btn").addClass("disabled");           
    } else {
        $(".bone").css("display","none");
    }
}


// Select other change
function categoryOtherChange(checkbox) {
    if (checkbox.checked) {
        $(".other").css("display","inline");
        
        // turn other dots off
        $(".neural").css("display","none");
        $(".psychological").css("display","none");
        $(".cardiovascular").css("display","none");
        $(".cancer").css("display","none");
        $(".bone").css("display","none");
        
        // turn off any other checkbox ticks
        $("#select-neural").attr("checked",false);
        $("#select-psychological").attr("checked",false);
        $("#select-cardiovascular").attr("checked",false);
        $("#select-cancer").attr("checked",false);
        $("#select-bone").attr("checked",false);
        $("#select-all").attr("checked",false);
        
        // display other event - copd
        buttonEvent('copd');

        // turn off other group for dropdown
        $("#othergroup").prop('disabled', false);
        
        // turn off all options for dropdown
        $("#braingroup").prop('disabled', true);    
        $("#psychgroup").prop('disabled', true);        
        $("#heartgroup").prop('disabled', true);        
        $("#bonegroup").prop('disabled', true);               
        $("#cancergroup").prop('disabled', true);

        // set category selected var
        TC_VARS.categorySelected = "other";
        
        // disable next/prev buttons
        $("#next-btn").addClass("disabled");
        $("#prev-btn").addClass("disabled");           
    } else {
        $(".other").css("display","none");
    }
}
// ---------------------------------------------------------------
// Find next disease in data
function getNextDisease(disease) {
    var diseaseKeys = Object.keys(data);
    var diseaseLocation = diseaseKeys.indexOf(disease);
    
    
    // next disease is diseaseLocation + 1
    
    if (diseaseLocation < (diseaseKeys.length - 1)) {
        return diseaseKeys[diseaseLocation + 1];
    } else {
        return diseaseKeys[0];
    }
}

// ---------------------------------------------------------------
// Find next disease in data
function getPrevDisease(disease) {
    var diseaseKeys = Object.keys(data);
    var diseaseLocation = diseaseKeys.indexOf(disease);
    
    if (diseaseLocation > 0) {
        var nextDiseaseKey = diseaseKeys[diseaseLocation - 1];
        return nextDiseaseKey;
    } else {
        return diseaseKeys[diseaseKeys.length - 1];
    }
}

// ---------------------------------------------------------------
// Find disease in data
function getDisease(disease) {
  return data.filter(
    function(data){return data.disease == disease}
  );
}

// ---------------------------------------------------------------
// Loop through all item in object

function showObjectjQuery(obj) {
  var result = "";
  $.each(obj, function(k, v) {
    result += k + " , " + v + "\n";
  });
  return result;
}


// ---------------------------------------------------------------
// Resize end function

function resizeend() {
    if (new Date() - TC_VARS.rtime < TC_VARS.delta) {
        setTimeout(resizeend, TC_VARS.delta);
    } else {
        TC_VARS.timeout = false;
        $("#" + TC_VARS.currentDisease).focus();
    }               
}

// ========================================================================= //
// DOCUMENT READY FUNCTION 
jQuery(document).ready(function($) {

    // CLICK ON NEXT OR PREVIOUS BUTTON
    // next button
    $("#next-btn").click(function() { 
        // find next disease
        // update infobox with next disease        
        buttonEvent(getNextDisease(TC_VARS.currentDisease));
    });
    
    // prev button clicked
    $("#prev-btn").click(function() { 
        // find previous disease
        // update infobox with prev disease
        buttonEvent(getPrevDisease(TC_VARS.currentDisease));
    });    

    $("#general").focus();

    
    // on window resize, remove focus from current disease
    $( window ).resize(function() {
        $("#" + TC_VARS.currentDisease).blur();
        
        TC_VARS.rtime = new Date(-1E12);
        if (TC_VARS.timeout === false) {
            TC_VARS.timeout = true;
            setTimeout(resizeend, TC_VARS.delta);
        }
    });
    

});