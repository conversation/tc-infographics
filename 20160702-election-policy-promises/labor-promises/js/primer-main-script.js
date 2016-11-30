
// GLOBAL VARS

// GLOBAL CONTSTANTS


// ========================================================================= //
// DOCUMENT READY FUNCTION 
jQuery(document).ready(function($) {

    // ********************* PRIMER EXPAND BUTTON CLICK *********************
    $(".primerButton").on('click', function(e)  {
        
        var scroll = $(window).scrollTop();
        
        //console.log("Analysis expand button");     
        var parentClickID = jQuery(this).parent().attr('id');
            
        //console.log("Parent Div ID: " + parentClickID);
        // show-hide primer
        $("#" + parentClickID + " .primerText").toggleClass('show');

        if($("#" + parentClickID + " .primerText").hasClass('show')==true)
        {
            //console.log("Has class show");
            // update instructions
            $("#" + parentClickID + " .primerExpand").empty();
            $("#" + parentClickID + " .primerExpand").append('-');

            $("#" + parentClickID + " .primerExpandText").empty();
            $("#" + parentClickID + " .primerExpandText").append('close');             
            
        } else {
            //console.log("No class show");
            // update instructions
            $("#" + parentClickID + " .primerExpand").empty();
            $("#" + parentClickID + " .primerExpand").append('+');

            $("#" + parentClickID + " .primerExpandText").empty();
            $("#" + parentClickID + " .primerExpandText").append('expand'); 
            
        }
        $('body, html', parent.document).animate({ scrollTop: 0 },200);        
        e.preventDefault();
    });
    
    
    // ********************* PRIMER BOTTOM CLOSE CLICK *********************
    $(".bottomCloseBtn").on('click', function(e)  {
        var parentContainer = jQuery(this).parent().parent().attr('id');
        //console.log("Parent Div ID: " + parentContainer);
        
        // show-hide primer
        $("#" + parentContainer + " .primerText").toggleClass('show');
        
                var scroll = $(window).scrollTop();

        if($("#" + parentContainer + " .primerText").hasClass('show')==true)
        {
            //console.log("Has class show");
            // update instructions
            $("#" + parentContainer + " .primerExpand").empty();
            $("#" + parentContainer + " .primerExpand").append('-');

            $("#" + parentContainer + " .primerExpandText").empty();
            $("#" + parentContainer + " .primerExpandText").append('close');             
            
        } else {
            //console.log("No class show");
            // update instructions
            $("#" + parentContainer + " .primerExpand").empty();
            $("#" + parentContainer + " .primerExpand").append('+');

            $("#" + parentContainer + " .primerExpandText").empty();
            $("#" + parentContainer + " .primerExpandText").append('expand'); 
            
        }
        $('body, html', parent.document).animate({ scrollTop: 0 },200);        
        e.preventDefault();
            
    });        
           
});