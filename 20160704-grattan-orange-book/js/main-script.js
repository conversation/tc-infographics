
// GLOBAL VARS

// GLOBAL CONTSTANTS


// ========================================================================= //
// DOCUMENT READY FUNCTION 
jQuery(document).ready(function($) {

    // ********************* PRIMER EXPAND BUTTON CLICK *********************
    $(".sectionButton").on('click', function(e)  {
        
        var scroll = $(window).scrollTop();
        
        //console.log("Analysis expand button");     
        var parentClickID = jQuery(this).parent().attr('id');
            
        //console.log("Parent Div ID: " + parentClickID);
        // show-hide primer
        $("#" + parentClickID + " .sectionContent").toggleClass('show');

        if($("#" + parentClickID + " .sectionContent").hasClass('show')==true)
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
        $('body, html', parent.document).animate({ scrollTop: 0 },200);        
        e.preventDefault();
    });
    
    
    // ********************* PRIMER BOTTOM CLOSE CLICK *********************
    $(".bottomCloseBtn").on('click', function(e)  {
        var parentContainer = jQuery(this).parent().parent().attr('id');
        //console.log("Parent Div ID: " + parentContainer);
        
        // show-hide primer
        $("#" + parentContainer + " .sectionContent").toggleClass('show');
        
                var scroll = $(window).scrollTop();

        if($("#" + parentContainer + " .sectionContent").hasClass('show')==true)
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
        $('body, html', parent.document).animate({ scrollTop: 0 },200);        
        e.preventDefault();
            
    });        
           
});