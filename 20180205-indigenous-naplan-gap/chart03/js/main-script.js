// GLOBAL VARS


// GLOBAL CONSTS
var TC_CONST = {
    columnWidth : 754,
    maxHeight : 525,
    tcColours : {red: '#da352a', blue: '#4a90e2', green: '#50e3c2', orange: '#f5a623', grey: '#727272'}
}

/* ----------------------------------------------------------------- */
function showImage(buttonId) {
    $("#" + buttonId.toLowerCase() + "-img").addClass('active').siblings().removeClass('active');
    // update button text
    $("#dropdownMenuButton").html(buttonId);
}

/* ----------------------------------------------------------------- */
$('document').ready(function(){

    // ********************* EXPAND BUTTON CLICK LISTENER ************
    $(".dropdown-item").on('click', function(e)  {
        //console.log("Button clicked: " + jQuery(this).attr('id'));
        showImage(jQuery(this).attr('id'));

    });
     
});