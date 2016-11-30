
var chosenRiskFactor = "none";
var activeCategory = "none";
var activeSubmenu = "none";
var cancerType = "none";
var currentGender = "#Female";
var firstRiskFactor = true;

var showMenu = function() {
	$('body').removeClass("active-sidebar").toggleClass("active-nav");			
	$('.main-menu-btn').toggleClass("active-button");
    
    if ($('body').hasClass("active-nav")){
        console.log('Show menu');
        if (chosenRiskFactor != "none") {
                $(".main-menu-btn").empty();
                $(".main-menu-btn").append('Choose a risk factor');
        }
    }
    
    if (!($('body').hasClass("active-nav"))){
        console.log('Show menu');
        if (chosenRiskFactor != "none") {
                $(".main-menu-btn").empty();
                $(".main-menu-btn").append('< Back to risk factors');
        }
    }    
}

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

function defaultCancerDetails(){
    
    switch(chosenRiskFactor) {
    case "none":
        break;
    case "Alcohol":
        // load default cancer - bowel
        if (currentGender == "#Female") {
            buttonEvent('Bowel', 'Female');
        } else {
            buttonEvent('Bowel', 'Male');
        }
        break;
    case "Red meat":
        // load default cancer - bowel
        if (currentGender == "#Female") {
            buttonEvent('Bowel', 'Female');
        } else {
            buttonEvent('Bowel', 'Male');
        }
        break;
    case "Processed meat":
        // load default cancer - bowel
        if (currentGender == "#Female") {
            buttonEvent('Bowel', 'Female');
        } else {
            buttonEvent('Bowel', 'Male');
        }
        break;
    case "Salt and salted foods":
        // load default cancer - 
        if (currentGender == "#Female") {
            buttonEvent('Stomach', 'Female');
        } else {
            buttonEvent('Stomach', 'Male');
        }
        break;
    case "Inadequate intake of fruits":
        // load default cancer - 
        if (currentGender == "#Female") {
            buttonEvent('Stomach', 'Female');
        } else {
            buttonEvent('Stomach', 'Male');
        }
        break;
    case "Inadequate intake of fibre":
        // load default cancer - 
        if (currentGender == "#Female") {
            buttonEvent('Bowel', 'Female');
        } else {
            buttonEvent('Bowel', 'Male');
        }
        break;            
    case "Inadequate intake of non-starchy vegetables":
        // load default cancer - 
        if (currentGender == "#Female") {
            buttonEvent('Stomach', 'Female');
        } else {
            buttonEvent('Stomach', 'Male');
        }
        break;
    case "Smoking":
        // load default cancer - 
        if (currentGender == "#Female") {
            buttonEvent('Lung', 'Female');
        } else {
            buttonEvent('Lung', 'Male');
        }
        break; 
    case "Sun exposure":
        // load default cancer - 
        if (currentGender == "#Female") {
            buttonEvent('Melanoma', 'Female');
        } else {
            buttonEvent('Melanoma', 'Male');
        }
        break;
    case "Inadequate physical activity":
        // load default cancer - 
        if (currentGender == "#Female") {
            buttonEvent('Breast', 'Female');
        } else {
            buttonEvent('Bowel', 'Male');
        }
        break;
    case "Obesity":
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Breast', 'Female');
        } else {
            buttonEvent('Kidney', 'Male');
        }
        break;
    case "Overweight":
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Breast', 'Female');
        } else {
            buttonEvent('Kidney', 'Male');
        }
        break;
    case "Human papilloma virus":
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Cervix', 'Female');
        } else {
            buttonEvent('Anus', 'Male');
        }
        break;
    case "Helicobacter pylori":
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Stomach', 'Female');
        } else {
            buttonEvent('Stomach', 'Male');
        }
        break;
    case "Hepatitis B":
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Liver', 'Female');
        } else {
            buttonEvent('Liver', 'Male');
        }
        break;
    case "Hepatitis C":
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Non-Hodgkins lymphoma', 'Female');
        } else {
            buttonEvent('Non-Hodgkins lymphoma', 'Male');
        }
        break;
    case "HIV":
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Non-Hodgkins lymphoma', 'Female');
        } else {
            buttonEvent('Non-Hodgkins lymphoma', 'Male');
        }
        break;              
    case "Combined oral contraceptive":
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Breast', 'Female');
        }
        break;
    case "Hormone replacement therapy":
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Ovary', 'Female');
        }
        break;             
    }; // end of switch
    
}; // end of function  


// Click events on body
function buttonEvent(cancer, gender){

    // Get details of cancer and incident rates
    var cancerType = cancer;

    console.log(chosenRiskFactor);
    console.log(cancerType);

    // Get details of cancer and incident rates

    var riskfactordata = riskfactors[chosenRiskFactor][cancerType].personRisk;
    var personRisk = riskfactors[chosenRiskFactor][cancerType].personRisk;
    var maleRisk = riskfactors[chosenRiskFactor][cancerType].maleRisk;
    var femaleRisk = riskfactors[chosenRiskFactor][cancerType].femaleRisk;   
         

    // reset cancer info box to clear any previous data
    resetCancerInfobox();
    
    // close menu display
    $(".secondary-nav-food").css("display","none");
    $(".secondary-nav-disease").css("display","none");
    $(".secondary-nav-lifestyle").css("display","none");           
    $(".secondary-nav-medication").css("display","none");    
        
    // update content
    if (cancerType != 'Non-Hodgkins lymphoma') {
        $("#cancertypeoutput").append(cancerType);
    } else {
        $("#cancertypeoutput").append("Non-Hodgkin’s lymphoma");
    }
        

    $("#cancertypeoutput").css("display","inline");
    
    //if (personRisk != ""){
    //    $("#personriskoutput").css("display","block");
    //    $("#personriskoutput").append(personRisk);
    //}
       
    if ((maleRisk != "")&&(currentGender == "#Male")){
        $("#maleriskoutput").css("display","block");
        $("#maleriskoutput").append(maleRisk);
    }

    if ((femaleRisk != "")&&(currentGender == "#Female")){
        $("#femaleriskoutput").css("display","block");
        $("#femaleriskoutput").append(femaleRisk);
    }
    
    
   // show display output
    $("#cancerdetails").css("display","block");
};

function resetCancerInfobox() {    
    $("#cancerdetails").empty();
    $("#cancerdetails").append("<div id='cancertypeoutput'></div>");
    $("#cancerdetails").append("<div id='personriskoutput'></div>");
    $("#cancerdetails").append("<div id='maleriskoutput'></div>");
    $("#cancerdetails").append("<div id='femaleriskoutput'></div>");
}


function updateBreadcrumb(){
    $("#cancerbreadcrumb").empty();
    $("#instructions").empty();
    $("#cancerbreadcrumb").append(activeCategory + " > " + chosenRiskFactor);
    $("#instructions").append("Click on a specific cancer (body part) below:")
}

function loadUnloadSVGCache() {
    
    // load female svg files
    $(".female-svg").addClass("active-svg");
    
    // load male svg files
    jQuery('.tabs #Male').show().siblings().hide();    
    $(".male-svg").addClass("active-svg");     
    
    //make female the default
    jQuery('.tabs #Female').show().siblings().hide();     
    $(".female-svg").removeClass("active-svg");
    $("#female-default-svg").addClass("active-svg");
    
    
    // unload male svg
    $(".male-svg").removeClass("active-svg");
    $("#male-default-svg").addClass("active-svg");     
}


// ========================================================================= //
// DOCUMENT READY FUNCTION 
jQuery(document).ready(function($) {

    
    //load SVG images into cache
    loadUnloadSVGCache();

    
    // Toggle for nav menu
    $('.main-menu-btn').click(function(e) {
        e.preventDefault();
        showMenu();							
    });	
    // Toggle for sidebar
    $('.sidebar-button').click(function(e) {
        e.preventDefault();
        showSidebar();									
    });
    
    // TABS CLICK
    // Gender tabs click - normal screen
    jQuery('.tabs .tab-links a').on('click', function(e)  {
        currentGender = jQuery(this).attr('href');
        console.log(currentGender);
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentGender).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
        
        // load default cancer details if risk factor already chosen
        defaultCancerDetails();
    });
    
    
    // Gender tabs click - small screen
    jQuery('.tabs .tab-links-small a').on('click', function(e)  {
        currentGender = jQuery(this).attr('href');
        console.log(currentGender);
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentGender).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
        
        // load default cancer details if risk factor already chosen
        defaultCancerDetails();
    });
    
    
    // Category menu click
    // food and beverage
    $("#food-nav").click(function(){      
        console.log("Active category: " + activeCategory);
        console.log("Active risk factor: " + chosenRiskFactor);
        console.log("Active submenu: " + activeSubmenu);
        
        if ((activeCategory == "Food & beverage")&&(activeSubmenu == "food"))
        {
            $("#food-risks-submenu").css("display","none");
            activeCategory = "none";
            activeSubmenu = "none";
            
            // close cancer info box display
            $("#cancerdetails").css("display","none");
            
            // update expand button to '+'
            $("#food-expand").empty();
            $("#food-expand").append('+');

        } else if ((activeCategory == "Food & beverage")&&(chosenRiskFactor != "none")) {
            $("#food-risks-submenu").css("display","inline-block");
            activeSubmenu = "food";
            // update expand button to '-'
            $("#food-expand").empty();
            $("#food-expand").append('-');        
            
        } else {
            activeCategory = "Food & beverage";
            
            // close other secondary menus if open
            $("#lifestyle-risks-submenu").css("display","none");
            $("#disease-risks-submenu").css("display","none");
            $("#medication-risks-submenu").css("display","none");

            //display food risk submenu
            $("#food-risks-submenu").css("display","inline-block");
            //set active menu
            activeSubmenu = "food";
    
            // update all other expand buttons to '+'
            $(".expand-button").empty();
            $(".expand-button").append('+');            
            // update expand button to '-'
            $("#food-expand").empty();
            $("#food-expand").append('-');
           
        }
    });
    
    
    
    // Category menu click
    // lifestyle and behaviour
    $("#lifestyle-nav").click(function(){
        
        console.log("Active category: " + activeCategory);
        console.log("Active risk factor: " + chosenRiskFactor);
        console.log("Active submenu: " + activeSubmenu);
        
        if ((activeCategory == "Lifestyle & behaviour")&&(activeSubmenu == "lifestyle"))
        {
            $("#lifestyle-risks-submenu").css("display","none");
            activeCategory = "none";

            // close cancer info box display
            $("#cancerdetails").css("display","none");
            
            // update expand button to '+'
            $("#lifestyle-expand").empty();
            $("#lifestyle-expand").append('+');            

        } else if ((activeCategory == "Lifestyle & behaviour")&&(chosenRiskFactor != "none")) {
            $("#lifestyle-risks-submenu").css("display","inline-block");
            activeSubmenu = "lifestyle";
            
            // update expand button to '-'
            $("#lifestyle-expand").empty();
            $("#lifestyle-expand").append('-');      
        } else {
            activeCategory = "Lifestyle & behaviour";
            // close other secondary menus if open
            $("#food-risks-submenu").css("display","none");
            $("#disease-risks-submenu").css("display","none");
            $("#medication-risks-submenu").css("display","none");
            
            //display lifestyle risk submenu
            $("#lifestyle-risks-submenu").css("display","inline-block");
            activeSubmenu = "lifestyle";
            
            // update all other expand buttons to '+'
            $(".expand-button").empty();
            $(".expand-button").append('+');            
            // update expand button to '-'
            $("#lifestyle-expand").empty();
            $("#lifestyle-expand").append('-');        
        }
    });
    
    // Category menu click
    // Disease and illness
    $("#disease-nav").click(function(){
        
        console.log("Active category: " + activeCategory);
        console.log("Active risk factor: " + chosenRiskFactor);
        console.log("Active submenu: " + activeSubmenu);        
        
        if ((activeCategory == "Disease & illness")&&(activeSubmenu == "disease"))
        {
            $("#disease-risks-submenu").css("display","none");
            activeCategory = "none";

            // close cancer info box display
            $("#cancerdetails").css("display","none");

            // update expand button to '+'
            $("#disease-expand").empty();
            $("#disease-expand").append('+');                

        } else if ((activeCategory == "Disease & illness")&&(chosenRiskFactor != "none")) {
            $("#disease-risks-submenu").css("display","inline-block");
            activeSubmenu = "disease";              

            // update expand button to '-'
            $("#disease-expand").empty();
            $("#disease-expand").append('-');              
        } else {
            activeCategory = "Disease & illness";
            // close other secondary menus if open
            $("#food-risks-submenu").css("display","none");
            $("#lifestyle-risks-submenu").css("display","none");
            $("#medication-risks-submenu").css("display","none");
            
            //display lifestyle risk submenu
            $("#disease-risks-submenu").css("display","inline-block");
            activeSubmenu = "disease";

            // update all other expand buttons to '+'
            $(".expand-button").empty();
            $(".expand-button").append('+');            
            // update expand button to '-'
            $("#disease-expand").empty();
            $("#disease-expand").append('-');                    
        }
    });
    
    // Category menu click
    // Medication & treatment
    $("#medication-nav").click(function(){
        
        console.log("Active category: " + activeCategory);
        console.log("Active risk factor: " + chosenRiskFactor);
        
        if ((activeCategory == "Medication & treatment")&&(activeSubmenu == "medication"))
        {
            $("#medication-risks-submenu").css("display","none");
            activeCategory = "none";

            // close cancer info box display
            $("#cancerdetails").css("display","none");

            // update expand button to '+'
            $("#medication-expand").empty();
            $("#medication-expand").append('+');             

        } else if ((activeCategory == "Medication & treatment")&&(chosenRiskFactor != "none")) {
            $("#medication-risks-submenu").css("display","inline-block");
            activeSubmenu = "medication";
            
            // update expand button to '+'
            $("#medication-expand").empty();
            $("#medication-expand").append('-');  
        } else {
            activeCategory = "Medication & treatment";
            // close other secondary menus if open
            $("#food-risks-submenu").css("display","none");
            $("#lifestyle-risks-submenu").css("display","none");
            $("#disease-risks-submenu").css("display","none");
            
            //display lifestyle risk submenu
            $("#medication-risks-submenu").css("display","inline-block");
            activeSubmenu = "medication";
            
            // update all other expand buttons to '+'
            $(".expand-button").empty();
            $(".expand-button").append('+');            
            // update expand button to '-'
            $("#medication-expand").empty();
            $("#medication-expand").append('-');             
        }
    });
    
    
    // CLICK ON RISK FACTOR
    // cancer risk factor click
    // alcohol
    $("#risk-alcohol").click(function(){
        
        // update menu
        //if (chosenRiskFactor == "none") {
        //    $(".main-menu-btn").empty();
        //    $(".main-menu-btn").append('< Back to risk factors');
        //}
        
        // set risk factor
        chosenRiskFactor = "Alcohol";
        
        //set active risk
        $("#risk-alcohol").addClass("activerisk").siblings().removeClass("activerisk");
        
        // show alcohol svg
        //$("#Female").empty();
        //$("#Female").append('<object data="images/body-female-alcohol.svg" type="image/svg+xml"></object>');
        if (!($("#female-alcohol-svg").hasClass("active-svg"))) 
        {
            $("#female-alcohol-svg").addClass("active-svg").siblings().removeClass("active-svg");                   
            $("#male-alcohol-svg").addClass("active-svg").siblings().removeClass("active-svg");                
        }


        // update menu highlights
        // set menu to current
        $("#food-nav").addClass("current").siblings().removeClass("current");       

        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Alcohol');
        $(".riskchosen").css('display', 'inline-block');
        
        
        // load default cancer - bowel
        if (currentGender == "#Female") {
            buttonEvent('Bowel', 'Female');
        } else {
            buttonEvent('Bowel', 'Male');
        }
        
        showMenu();	
    });

    // cancer risk factor click
    // red meat
    $("#risk-red-meat").click(function(){
        
        chosenRiskFactor = "Red meat";

        //set active risk
        //removeActiveRiskClass()
        $("#risk-red-meat").addClass("activerisk").siblings().removeClass("activerisk");
        

        // show red meat / processed meat svg
        if (!($("#female-meat-svg").hasClass("active-svg"))) {        
            $("#female-meat-svg").addClass("active-svg").siblings().removeClass("active-svg"); 
            $("#male-meat-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
        
        // update menu highlights
        // set menu to current / food
        $("#food-nav").addClass("current").siblings().removeClass("current");

        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Red meat');
        $(".riskchosen").css('display', 'inline-block');        
        
        // load default cancer - bowel
        if (currentGender == "#Female") {
            buttonEvent('Bowel', 'Female');
        } else {
            buttonEvent('Bowel', 'Male');
        }
        showMenu();         
    });

    // cancer risk factor click
    // processed meat
    $("#risk-processed-meat").click(function(){
        
        chosenRiskFactor = "Processed meat";

        //set active risk
        $("#risk-processed-meat").addClass("activerisk").siblings().removeClass("activerisk");
        

        // show red meat / processed meat svg
        if (!($("#female-meat-svg").hasClass("active-svg"))) {           
            $("#female-meat-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-meat-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
        // update menu highlights
        // set menu to current / food
        $("#food-nav").addClass("current").siblings().removeClass("current");
        
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Processed meat');
        $(".riskchosen").css('display', 'inline-block');        
        
        // load default cancer - bowel
        if (currentGender == "#Female") {
            buttonEvent('Bowel', 'Female');
        } else {
            buttonEvent('Bowel', 'Male');
        }       
        showMenu();        
    });    

    // cancer risk factor click
    // salt and salted foods
    $("#risk-salt").click(function(){
              
        chosenRiskFactor = "Salt and salted foods";

        //set active risk
        //removeActiveRiskClass()
        $("#risk-salt").addClass("activerisk").siblings().removeClass("activerisk");
        
        // show salt svg
        if (!($("#female-salt-svg").hasClass("active-svg"))) {           
            $("#female-salt-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-salt-svg").addClass("active-svg").siblings().removeClass("active-svg");        
        }
        // update menu highlights
        // set menu to current / food
        $("#food-nav").addClass("current").siblings().removeClass("current"); 

        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Too much salt');
        $(".riskchosen").css('display', 'inline-block');
        
        // load default cancer - stomach
        if (currentGender == "#Female") {
            buttonEvent('Stomach', 'Female');
        } else {
            buttonEvent('Stomach', 'Male');
        }                
        showMenu();       
    });
    
    // cancer risk factor click
    // fruits
    $("#risk-fruit").click(function(){
      
        chosenRiskFactor = "Inadequate intake of fruits";

        //set active risk
        $("#risk-fruit").addClass("activerisk").siblings().removeClass("activerisk");

        // show fruit svg
        if (!($("#female-fruit-svg").hasClass("active-svg"))) {           
            $("#female-fruit-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-fruit-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
        // update menu highlights
        // set menu to current / food
        $("#food-nav").addClass("current").siblings().removeClass("current");

        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Not enough fruits');
        $(".riskchosen").css('display', 'inline-block');        
    
        // load default cancer - stomach
        if (currentGender == "#Female") {
            buttonEvent('Stomach', 'Female');
        } else {
            buttonEvent('Stomach', 'Male');
        }                
        showMenu();        
    });

    // cancer risk factor click
    // fibre
    $("#risk-fibre").click(function(){
                
        chosenRiskFactor = "Inadequate intake of fibre";

        //set active risk
        $("#risk-fibre").addClass("activerisk").siblings().removeClass("activerisk");     

        // show fibre svg
        if (!($("#female-fibre-svg").hasClass("active-svg"))) {           
            $("#female-fibre-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-fibre-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
        // update menu highlights
        // set menu to current / food
        $("#food-nav").addClass("current").siblings().removeClass("current");          
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Not enough fibre');
        $(".riskchosen").css('display', 'inline-block'); 
        // load default cancer - bowel
        if (currentGender == "#Female") {
            buttonEvent('Bowel', 'Female');
        } else {
            buttonEvent('Bowel', 'Male');
        }             
        showMenu();           
    });  
    
    // cancer risk factor click
    // vegetables
    $("#risk-vegetables").click(function(){
       
        chosenRiskFactor = "Inadequate intake of non-starchy vegetables";

        //set active risk
        $("#risk-vegetables").addClass("activerisk").siblings().removeClass("activerisk");
        

        // show veg svg
        if (!($("#female-veg-svg").hasClass("active-svg"))) {            
            $("#female-veg-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-veg-svg").addClass("active-svg").siblings().removeClass("active-svg");        
        }
        // update menu highlights
        // set menu to current / food
        $("#food-nav").addClass("current").siblings().removeClass("current"); 
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Not enough vegetables');
        $(".riskchosen").css('display', 'inline-block');         
        // load default cancer - stomach
        if (currentGender == "#Female") {
            buttonEvent('Stomach', 'Female');
        } else {
            buttonEvent('Stomach', 'Male');
        }                     
        showMenu();            
    });
    
  // cancer risk factor click
    // smoking
    $("#risk-smoking").click(function(){
      
        chosenRiskFactor = "Smoking";

        //set active risk
        $("#risk-smoking").addClass("activerisk").siblings().removeClass("activerisk");
              
        // show smoking svg
        if (!($("#female-smoking-svg").hasClass("active-svg"))) {            
            $("#female-smoking-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-smoking-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
        // set menu to current
        $("#lifestyle-nav").addClass("current").siblings().removeClass("current");
        
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Smoking');
        $(".riskchosen").css('display', 'inline-block');         
        
        // load default cancer - stomach
        if (currentGender == "#Female") {
            buttonEvent('Lung', 'Female');
        } else {
            buttonEvent('Lung', 'Male');
        }            
        showMenu();           
    });    

    // cancer risk factor click
    // sun
    $("#risk-sun").click(function(){
                
        chosenRiskFactor = "Sun exposure";

        //set active risk
        $("#risk-sun").addClass("activerisk").siblings().removeClass("activerisk");
        
                  
        // show sun svg
        if (!($("#female-sun-svg").hasClass("active-svg"))) {            
            $("#female-sun-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-sun-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
    
        // set menu to current
        $("#lifestyle-nav").addClass("current").siblings().removeClass("current");         

        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Sun exposure');
        $(".riskchosen").css('display', 'inline-block'); 
        
        // load default cancer - stomach
        if (currentGender == "#Female") {
            buttonEvent('Melanoma', 'Female');
        } else {
            buttonEvent('Melanoma', 'Male');
        }              
        showMenu();           
    });

    // cancer risk factor click
    // risk-inactivity
    $("#risk-inactivity").click(function(){
               
        chosenRiskFactor = "Inadequate physical activity";

        //set active risk
        $("#risk-inactivity").addClass("activerisk").siblings().removeClass("activerisk");
        

        // show inactivity svg 
        if (!($("#female-inactivty-svg").hasClass("active-svg"))) {    
            $("#female-inactivity-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-inactivity-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }

        // set menu to current
        $("#lifestyle-nav").addClass("current").siblings().removeClass("current");
        
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Inadequate physical activity');
        $(".riskchosen").css('display', 'inline-block');     
        
        // load default cancer - stomach
        if (currentGender == "#Female") {
            buttonEvent('Breast', 'Female');
        } else {
            buttonEvent('Bowel', 'Male');
        }            
        showMenu();           
    });     


    // cancer risk factor click
    // obesity
    $("#risk-obesity").click(function(){
               
        chosenRiskFactor = "Obesity";

        //set active risk
        $("#risk-obesity").addClass("activerisk").siblings().removeClass("activerisk");
        
        // show obesity and overweight svg
        if (!($("#female-obesity-svg").hasClass("active-svg"))) {            
            $("#female-obesity-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-obesity-svg").addClass("active-svg").siblings().removeClass("active-svg"); 
        }
        // set menu to current
        $("#disease-nav").addClass("current").siblings().removeClass("current"); 
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Obesity');
        $(".riskchosen").css('display', 'inline-block'); 
        
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Breast', 'Female');
        } else {
            buttonEvent('Kidney', 'Male');
        }             
        showMenu();            
    });

    // cancer risk factor click
    // overweight
    $("#risk-overweight").click(function(){
               
        chosenRiskFactor = "Overweight";

        //set active risk
        $("#risk-overweight").addClass("activerisk").siblings().removeClass("activerisk");
        
        // show obesity and overweight svg    
        if (!($("#female-overweight-svg").hasClass("active-svg"))) {          
            $("#female-overweight-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-overweight-svg").addClass("active-svg").siblings().removeClass("active-svg"); 
        }
        // set menu to current
        $("#disease-nav").addClass("current").siblings().removeClass("current");       
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Overweight');
        $(".riskchosen").css('display', 'inline-block'); 
        
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Breast', 'Female');
        } else {
            buttonEvent('Kidney', 'Male');
        }           
        showMenu();           
    });

    // cancer risk factor click
    // Human Papilloma Virus
    $("#risk-hpv").click(function(){
        
       
        chosenRiskFactor = "Human papilloma virus";

        //set active risk
        $("#risk-hpv").addClass("activerisk").siblings().removeClass("activerisk");

        // show hpv svg  
        if (!($("#female-human-papilloma-svg").hasClass("active-svg"))) {           
            $("#female-human-papilloma-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-human-papilloma-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
        // set menu to current
        $("#disease-nav").addClass("current").siblings().removeClass("current");  
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Human papilloma virus');
        $(".riskchosen").css('display', 'inline-block');        

        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Cervix', 'Female');
        } else {
            buttonEvent('Anus', 'Male');
        }             
        showMenu();           
    });
    
    // cancer risk factor click
    // Helicobacter pylori
    $("#risk-helicobacter").click(function(){
               
        chosenRiskFactor = "Helicobacter pylori";

        //set active risk
        $("#risk-helicobacter").addClass("activerisk").siblings().removeClass("activerisk");
        
        // show helicobacter pylori svg      
        if (!($("#female-helicobacter-svg").hasClass("active-svg"))) {           
            $("#female-helicobacter-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-helicobacter-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
        // set menu to current
        $("#disease-nav").addClass("current").siblings().removeClass("current");
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Helicobacter pylori');
        $(".riskchosen").css('display', 'inline-block');        
        
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Stomach', 'Female');
        } else {
            buttonEvent('Stomach', 'Male');
        }            
        showMenu();           
    });
    
    // cancer risk factor click
    // Hep B
    $("#risk-hepB").click(function(){
              
        chosenRiskFactor = "Hepatitis B";

        //set active risk
        $("#risk-hepB").addClass("activerisk").siblings().removeClass("activerisk");
        
        // show Hepatitis B svg
        if (!($("#female-hep-b-svg").hasClass("active-svg"))) {          
            $("#female-hep-b-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-hep-b-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
        // set menu to current
        $("#disease-nav").addClass("current").siblings().removeClass("current");          
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Hepatitis B');
        $(".riskchosen").css('display', 'inline-block');  
    
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Liver', 'Female');
        } else {
            buttonEvent('Liver', 'Male');
        }             
        showMenu();            
    });
    
    // cancer risk factor click
    // Hep C
    $("#risk-hepC").click(function(){
               
        chosenRiskFactor = "Hepatitis C";

        //set active risk
        $("#risk-hepC").addClass("activerisk").siblings().removeClass("activerisk");
        
        // show Hepatitis B C svg
        if (!($("#female-hep-c-svg").hasClass("active-svg"))) {         
            $("#female-hep-c-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-hep-c-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
        // set menu to current
        $("#disease-nav").addClass("current").siblings().removeClass("current");
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Hepatitis C');
        $(".riskchosen").css('display', 'inline-block');         
        
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Non-Hodgkins lymphoma', 'Female');
        } else {
            buttonEvent('Non-Hodgkins lymphoma', 'Male');
        }             
        showMenu();            
    }); 

    // cancer risk factor click
    // HIV
    $("#risk-HIV").click(function(){
                
        chosenRiskFactor = "HIV";

        //set active risk
        $("#risk-HIV").addClass("activerisk").siblings().removeClass("activerisk");
        
        // show HIV svg
        if (!($("#female-hiv-svg").hasClass("active-svg"))) {         
            $("#female-hiv-svg").addClass("active-svg").siblings().removeClass("active-svg");
            $("#male-hiv-svg").addClass("active-svg").siblings().removeClass("active-svg"); 
        }
        // set menu to current
        $("#disease-nav").addClass("current").siblings().removeClass("current");
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('HIV');
        $(".riskchosen").css('display', 'inline-block');         
        
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Non-Hodgkins lymphoma', 'Female');
        } else {
            buttonEvent('Non-Hodgkins lymphoma', 'Male');
        }           
        showMenu();           
    });     

    // cancer risk factor click
    // contraceptive pill
    $("#risk-contraceptive").click(function(){
                
        chosenRiskFactor = "Combined oral contraceptive";

        //set active risk
        $("#risk-contraceptive").addClass("activerisk").siblings().removeClass("activerisk");

        // show contraceptive svg
        if (!($("#female-contraceptive-svg").hasClass("active-svg"))) {         
            $("#female-contraceptive-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
        if (!($("#male-empty-svg").hasClass("active-svg"))) {         
            $("#male-empty-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
        
        // Show Female/Hide Male
        jQuery('.tabs ' + "#Female").show().siblings().hide();
        $("#female-tab").addClass('active').siblings().removeClass('active');
        currentGender = "#Female";
        
        // Show Female/Hide Male (small screen)
        jQuery('.tabs ' + "#Female").show().siblings().hide();
        $("#female-tab-small").addClass('active').siblings().removeClass('active');
        currentGender = "#Female";         

        // set menu to current
        $("#medication-nav").addClass("current").siblings().removeClass("current");
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Combined oral contraceptive');
        $(".riskchosen").css('display', 'inline-block');         
        
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Breast', 'Female');
        }                  
        showMenu();            
    });  

    // cancer risk factor click
    // HRT
    $("#risk-HRT").click(function(){
       
        chosenRiskFactor = "Hormone replacement therapy";

        //set active risk
        $("#risk-HRT").addClass("activerisk").siblings().removeClass("activerisk");
        
        // show HRT svg 
        if (!($("#female-hrt-svg").hasClass("active-svg"))) {          
            $("#female-hrt-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
        if (!($("#male-empty-svg").hasClass("active-svg"))) {         
            $("#male-empty-svg").addClass("active-svg").siblings().removeClass("active-svg");
        }
        
        // Show Female/Hide Male
        jQuery('.tabs ' + "#Female").show().siblings().hide();
        $("#female-tab").addClass('active').siblings().removeClass('active');
        currentGender = "#Female";
        
        // Show Female/Hide Male (small screen)
        jQuery('.tabs ' + "#Female").show().siblings().hide();
        $("#female-tab-small").addClass('active').siblings().removeClass('active');
        currentGender = "#Female";        

        // set menu to current
        $("#medication-nav").addClass("current").siblings().removeClass("current");
        // update risk factor heading
        $(".riskchosen").empty();
        $(".riskchosen").append('Hormone replacement therapy');
        $(".riskchosen").css('display', 'inline-block');         

        
        // load default cancer
        if (currentGender == "#Female") {
            buttonEvent('Ovary', 'Female');
        }          
        showMenu();           
    });  

});