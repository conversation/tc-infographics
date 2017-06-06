
// GLOBAL VARS

// GLOBAL CONTSTANTS

// ========================================================================= //
function expandButtonClick(_this, _e) {

        var scroll = $(window).scrollTop();
        
        //console.log("Analysis expand button");     
        var parentClickID = jQuery(_this).parent().attr('id');
            
        //console.log("Parent Div ID: " + parentClickID);
        // show-hide primer
        $("#" + parentClickID + " .responseText").toggleClass('show');

        if($("#" + parentClickID + " .responseText").hasClass('show')==true)
        {
            //console.log("Has class show");
            // update instructions
            $("#" + parentClickID + " .expandSymbol").empty();
            $("#" + parentClickID + " .expandSymbol").append('-');

            $("#" + parentClickID + " .expandText").empty();
            $("#" + parentClickID + " .expandText").append('close');             
            
        } else {
            //console.log("No class show");
            // update instructions
            $("#" + parentClickID + " .expandSymbol").empty();
            $("#" + parentClickID + " .expandSymbol").append('+');

            $("#" + parentClickID + " .expandText").empty();
            $("#" + parentClickID + " .expandText").append('expand'); 
            
        }      
        _e.preventDefault();    
}

// ========================================================================= //

function bottomButtonClick(_this, _e) {

        var parentContainer = jQuery(_this).parent().parent().attr('id');
        //console.log("Parent Div ID: " + parentContainer);
        
        // show-hide primer
        $("#" + parentContainer + " .responseText").toggleClass('show');
        
                var scroll = $(window).scrollTop();

        if($("#" + parentContainer + " .responseText").hasClass('show')==true)
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
        _e.preventDefault();    
}

// ========================================================================= //

function getResponseClass(response){
    switch(response) {
        case 'Strongly agree':
            return 'stronglyAgree';
            break;
        case 'Agree':
            return 'agree';
            break;
        case 'Uncertain':
            return 'uncertain';
        case 'Disagree':
            return 'disagree';
        case 'Strongly disagree':
            return 'stronglyDisagree';
            break;            
        case 'No opinion':
            return 'noOpinion';
    }
}
// ========================================================================= //
function buildSurveyResults(){
    for (var economist in surveyResults) {
        if (surveyResults.hasOwnProperty(economist)) {
            //console.log(surveyResults[economist]["Fullname"]);
            //console.log(surveyResults[economist]["Response"]);
            
            var name = surveyResults[economist]["Fullname"];
            var response = surveyResults[economist]["Response"];
            var confidence = surveyResults[economist]["Confidence"];
            var comment = surveyResults[economist]["Comment"];
            
            var economistID = name.replace(" ", "");
            var responseClass = getResponseClass(response);
            
            //console.log(economistID);
            $("#surveyResults").append("<div id='" + economistID + "'></div>")
            $("#" + economistID).append("<div class='responseButton " + responseClass + "'><img class='icon' src='images/" + economistID + ".jpg'><div class='buttonItems'><span class='heading'>" + name + "</span><span class='response'>" + response + "</span><span class='expandButton expandSymbol'>+</span><span class='expandButton expandText'>expand</span></div></div><div class='responseText'>" + comment + "<div class='confidence'><ul><li><span class='label'>Confidence:</span><span class='value'>" + confidence + "</span></li></ul></div><div class='bottomCloseBtn'>&uarr; Close</div></div>");
        }
    }
}

// ========================================================================= //
// ========================================================================= //
// DOCUMENT READY FUNCTION 
jQuery(document).ready(function($) {

        
    // ********************* BUILD RESULTS *********************
    buildSurveyResults();
    
    // ********************* EXPAND BUTTON CLICK LISTENER ************
    $(".responseButton").on('click', function(e)  {
        expandButtonClick(this,e);
    });
     
    // ********************* BOTTOM CLOSE CLICK LISTENER ************
    $(".bottomCloseBtn").on('click', function(e)  {
        bottomButtonClick(this,e);   
    });  

           
});