
// GLOBAL VARS
var chosenMinister = "none";
var currentTab = "#all-tab";
var scrollPosition = "";
var analysisShowHide = "show";
var seatShowHide = "show";
var chosenPortfolio = "";
var positionShowHide = "show";
var namesShowHide = "show";

// GLOBAL CONTSTANTS
var ministerClickInsertID = "selectedMinisterProfile";
var governmentTab = "#government-tab";
var oppositionTab = "#opposition-tab";
var portfolioTab = "#portfolio-tab";
var allTab = "#all-tab";

//console.log = function() {};

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function plotElectionResults (coalitionVotes, laborVotes, seat) {
    var categories = ['Coalition', 'Labor'];
    var data = [parseFloat(coalitionVotes),parseFloat(laborVotes)];
    var colours = ['#0059b3','#c22e24'];
    var chartPadding = 40;
    var padding = 5;

    var width = 250,
        barHeight = 20;
    
    var scale = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([padding, width - padding]);
    
    var axisScale = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([padding, width]);
    
    var xAxis = d3.svg.axis()
                  .scale(axisScale)
                  .orient("bottom")
                    .ticks(8);  

    var mapId = seat.replace(/\s+/g, '-');
    var chartId = "chart-" + mapId;
    
    //console.log("chart id: " + chartId);
    //console.log("coalition votes: " + coalitionVotes);
    //console.log("labor votes: " + laborVotes);
    
    
    
    
    var chart = d3.select(".chart#"+chartId)
        .attr("width", width)
        .attr("height", barHeight * data.length + chartPadding);

    var bar = chart.selectAll("g")
            .data(data)   
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(5," + i * barHeight + ")"; });

    bar.append("rect")     
        .attr("width", scale)
        .attr("height", barHeight - 1)
        .attr("fill", function(d, i) { return colours[i]; });

    bar.append("text")
        .attr("x", function(d) { return scale(d) - 5; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d, i) { return categories[i] + " : " + d; });
    
    // draw x axis
    chart.append("g")
        .attr("class", "axis") //Assign "axis" class
        .attr("transform", "translate(0," + chartPadding + ")")
        .call(xAxis);
}

// FUNCTION TO FILL IN MINISTER PROFILE for PORTFOLIO VIEW
function ministerPortfolioView (selectedMinister, insertDiv) {
        // get Minister's data
        var ministerName = profiles[selectedMinister].name;
        var ministerParty = profiles[selectedMinister].party;         
        var ministerDOB = profiles[selectedMinister].DOB;
        var ministerPosition = profiles[selectedMinister].currentPosition;        
        var ministerSeatType = profiles[selectedMinister].seatType;
        var ministerSeat = profiles[selectedMinister].seat;
        var ministerState = profiles[selectedMinister].state;    
        var ministerMargin = profiles[selectedMinister].margin;
        var ministerFaction = profiles[selectedMinister].faction;
        var ministerParliamentYear = profiles[selectedMinister].enteredParliament;
        var ministerNotableRoles = profiles[selectedMinister].notableRoles;
        
        //console.log("fn ministerPortfolioView: " + selectedMinister + " in " + insertDiv)

        //console.log("DOB: " + ministerDOB)
        var ministerAge = getAge(ministerDOB);
        

        // clear any previous content
        $("#" + insertDiv + " .profileBasics").empty();
    
        // add class
        $("#" + insertDiv + " .profileBasics").addClass("portfolioList " + ministerParty);
        
        // MINISTER PROFILE BASICS
        
        $("#" + insertDiv  + " .profileBasics").append("<div class='profileImage " + selectedMinister + "-158'></div>");        
        $("#" + insertDiv + " .profileBasics").append("<div class='profileDetail ministerName'>" + ministerName + "</div>");        
        $("#" + insertDiv + " .profileBasics").append("<div class='profileDetail ministerPosition'>" + ministerPosition + "</div>");
    
        if (ministerSeatType == "Senate") {
            
           $("#" + insertDiv +  " .profileBasics").append("<div class='profileDetail'><span class='senateHeading'>Senator for " + ministerState + "</span></div>");            
            
        } else {
            // MP

            $("#" + insertDiv + " .profileBasics").append("<div class='profileDetail'><span class='profileHeading'>Seat of: </span><span class='profileValue'>" + ministerSeat + " (" + ministerState + ") </span></div>");
            
        }       
        
        $("#" + insertDiv + " .profileBasics").append("<div class='profileDetail'><span class='profileHeading'>Party:</span><span class='profileValue'>" + ministerParty + "</span></div>");
        
        $("#" + insertDiv + " .profileBasics").append("<div class='profileDetail ministerAgeFaction'><div id='ministerAge'><span class='profileHeading'>Age:</span><span class='profileValue'>" + ministerAge + "</div></div>");        
        
        $("#" + insertDiv + " .profileBasics").append("<div class='profileDetail' ><span class='profileHeading'>Entered parliament:</span><span class='profileValue'>" + ministerParliamentYear + "</span></div>");
        
        $("#" + insertDiv + " .profileBasics").append("<div class='profileDetail'><span class='profileHeading'>Notable roles:</span><span class='profileValue'>" + ministerNotableRoles + "</span></div>");
    
        // view details button
        //$("#" + insertDiv + " .profileBasics").append("<div class='profileDetailButton'>View details and anlysis</div>");
        $("#" + insertDiv + " .profileDetailButton").attr('id', selectedMinister);
        
    
} // END OF FUNCTION


// FUNCTION TO FILL IN MINISTER PROFILE
function ministerProfileView (selectedMinister, insertDiv) {
        // get Minister's data
        var ministerName = profiles[selectedMinister].name;
        var ministerParty = profiles[selectedMinister].party;         
        var ministerDOB = profiles[selectedMinister].DOB;
        var ministerPosition = profiles[selectedMinister].currentPosition;        
        var ministerSeatType = profiles[selectedMinister].seatType;
        var ministerSeat = profiles[selectedMinister].seat;
        var ministerState = profiles[selectedMinister].state;    
        var ministerMargin = profiles[selectedMinister].margin;
        var ministerFaction = profiles[selectedMinister].faction;
        var ministerParliamentYear = profiles[selectedMinister].enteredParliament;
        var ministerNotableRoles = profiles[selectedMinister].notableRoles;
        var ministerPriorOccupation = profiles[selectedMinister].priorOccupation;
        var lastElectionCoalitionVotes = profiles[selectedMinister].lastElectionCoalitionVotes;
        var lastElectionLaborVotes = profiles[selectedMinister].lastElectionLaborVotes;
        var ministerAnalysis = profiles[selectedMinister].analysis;
        var ministerSeatNotes = profiles[selectedMinister].seatNotes; 
        var factionLabel = "Alignment";
        
        if (ministerParty == "Labor") {
            factionLabel = "Faction";
        }
        var mapId = ministerSeat.replace(/\s+/g, '-');    
        var chartId = "chart-" + mapId;
        var ministerAge = getAge(ministerDOB);
        

        // clear any previous content
        $("#" + insertDiv + " .profileBasics").empty();
        $("#" + insertDiv  + " .ministerAnalysis").empty();
        $("#" + insertDiv  + " .ministerSeatDetails").empty();       

        // fill data
        //console.log(ministerName);
        
        // MINISTER PROFILE BASICS
        
        $("#" + insertDiv  + " .profileBasics").append("<div class='profileImage " + selectedMinister + "-158'></div>");
        
        $("#" + insertDiv + " .profileBasics").append("<div class='profileDetail ministerName'>" + ministerName + "</div>");
        
        $("#" + insertDiv + " .profileBasics").append("<div class='profileDetail ministerPosition'>" + ministerPosition + "</div>");
    
        if (ministerSeatType == "Senate") {
            
           $("#" + insertDiv +  " .profileBasics").append("<div class='profileDetail'><span class='senateHeading'>Senator for " + ministerState + "</span></div>");            
            
        } else {
            
           $("#" + insertDiv +  " .profileBasics").append("<div class='profileDetail'><span class='senateHeading'>Member for " + ministerSeat + " (" + ministerState + ") </span></div>");               
        }
    
    
        $("#" + insertDiv + " .profileBasics").append("<div class='profileDetail ministerAgeFaction'><div id='ministerAge'><span class='profileHeading'>Age:</span><span class='profileValue'>" + ministerAge + "</div><div id='ministerEnteredParliament'><span class='profileHeading'>Entered parliament:</span><span class='profileValue'>" + ministerParliamentYear + "</div></div>");
    
        $("#" + insertDiv + " .profileBasics").append("<div class='profileDetail'><span class='profileHeading'>Party:</span><span class='profileValue'>" + ministerParty + "</span></div>");
                                                      
                                                      
        $("#" + insertDiv + " .profileBasics").append("<div id='ministerFaction'><span class='profileHeading'>" + factionLabel + ":</span><span class='profileValue'>" + ministerFaction + "</div>");
                     
        $("#" + insertDiv + " .profileBasics").append("<div class='profileDetail'><span class='profileHeading'>Notable roles:</span><span class='profileValue'>" + ministerNotableRoles + "</span></div>");
        
        $("#" + insertDiv + " .profileBasics").append("<div class='profileDetail'><span class='profileHeading'>Prior occupation:</span><span class='profileValue'>" + ministerPriorOccupation + "</span></div>"); 
        
        // MINISTER SEAT DETAILS
        if (ministerSeatType == "MP") {
            // MP
            // Show map
            $("#" + insertDiv + " .profileSeat .profileSeatButton").css('display','block');
            $("#" + insertDiv + " .profileSeat .profileSeatButton").empty();
            
            //set minister id for seat details 
            $("#" + insertDiv + " .profileSeat").attr('id', selectedMinister + '-seatDetails' );
            
            
            if (seatShowHide == 'hide') {
                $("#" + insertDiv + " .profileSeat .profileSeatButton").append("Seat of <span class='seatName'>" + ministerSeat + " (" + ministerState + ") </span><span class='expandButton seatExpand'>+</span><span class='expandButton seatExpandInfo'>expand</span>");
                
                //set minister id for seat button 
                $("#" + insertDiv + " .profileSeat .profileSeatButton").attr('id', selectedMinister + '-seatExpand' );
                
            } else {
                $("#" + insertDiv + " .profileSeat .profileSeatButton").append("Seat of <span class='seatName'>" + ministerSeat + "</span><span class='expandButton seatExpand'>-</span><span class='expandButton seatExpandInfo'>close</span>");
                $("#" + insertDiv + " .profileSeat .profileSeatButton").attr('id', selectedMinister + '-seatExpand' );
            }
            
            
                        // Insert map            
            $("#" + insertDiv + " .profileSeat .ministerSeatDetails").append("<div class='profileDetail ministerSeatMap " + mapId + "'></div>");  
            
            // Margin
            $("#" + insertDiv + " .profileSeat .ministerSeatDetails").append("<div class='profileDetail'><span class='profileHeading'>Margin:</span><span class='profileValue'>" + ministerMargin + "</span></div>");

            $("#" + insertDiv + " .profileSeat .ministerSeatDetails").append("<svg class='chart' id='" + chartId + "'</svg>");
            
            $("#" + insertDiv + " .profileSeat .ministerSeatDetails").append("<div class='chartHeading'>2013 election result for " + ministerSeat + "</div>");
            
            // call D3 function to plot bar chart
            plotElectionResults(lastElectionCoalitionVotes, lastElectionLaborVotes, ministerSeat);
            
 

                        
            if (ministerSeatNotes != "") {
                $("#" + insertDiv + " .profileSeat .ministerSeatDetails").append("<div class='profileNotes ministerSeatNote'>Note: " + ministerSeatNotes + "</div>"); 
            }
          
             $("#" + insertDiv + " .profileSeat .ministerSeatDetails").append("<div class='profileNotes ministerMarginNote'>The margin figures are from <a href='http://blogs.abc.net.au/antonygreen/2016/03/2016-federal-election-pendulum-update.html' target='_blank'>Antony Green's Election Blog</a> and have been updated to include the AEC redistributions</div>");                            
        } else {
            // Senator
            
            // If Senator - remove map button
            $("#" + insertDiv + " .profileSeat .profileSeatButton").css('display','none');
        }
        
    // add analysis
    $("#" + insertDiv + " .profileAnalysis").attr('id', selectedMinister + '-analysis' );
    $("#" + insertDiv + " .profileAnalysis .ministerAnalysis").append(ministerAnalysis);
    $("#" + insertDiv + " .profileAnalysis .profileAnalysisButton").attr('id', selectedMinister + '-analysisExpand' );
    
} // END OF FUNCTION


function setPortfolioView(selectedPortfolio) {
     switch(selectedPortfolio) {
        case 'leadershipPortfolio':
            //console.log("switch leadership");
             $("#leadershipGroup").addClass('active').siblings().removeClass('active');
             
            //call function to fill out minister profile
            ministerPortfolioView("malcolm-turnbull", "leadershipPortfolioMTurnbull");
            ministerPortfolioView("barnaby-joyce", "leadershipPortfolioBJoyce"); 
            ministerPortfolioView("bill-shorten", "leadershipPortfolioBShorten");              
            break;
        case 'deputyPortfolio':
            //console.log("switch deputy");
             $("#deputyGroup").addClass('active').siblings().removeClass('active');
             
            //call function to fill out minister profile
            ministerPortfolioView("julie-bishop", "deputyPortfolioBBishop");
            ministerPortfolioView("tanya-plibersek", "deputyPortfolioTPlibersek");              
            break;             
        case 'educationPortfolio':
            //console.log("switch education");
            $("#educationGroup").addClass('active').siblings().removeClass('active');
             
            // setup desktop view
            ministerPortfolioView("simon-birmingham", "educationPortfolioSBirmingham");
            ministerPortfolioView("kate-ellis", "employmentPortfolioKEllis");             
             
            break;
        case 'treasuryPortfolio':
            //console.log("switch treasury");
            $("#treasuryGroup").addClass('active').siblings().removeClass('active');
            
             //call function to fill out minister profile
            ministerPortfolioView("scott-morrison", "treasuryPortfolioSMorrison");
            ministerPortfolioView("kelly-o-dwyer", "treasuryPortfolioKODwyer"); 
            ministerPortfolioView("chris-bowen", "treasuryPortfolioCBowen");   
            break;
        case 'financePortfolio':
            //console.log("switch finance");
            //setup mobile view
            $("#financeGroup").addClass('active').siblings().removeClass('active');
            
            // setup desktop view
            ministerPortfolioView("mathias-cormann", "financePortfolioMCormann");
            ministerPortfolioView("tony-burke", "financePortfolioTBurke");

            break;
        case 'employmentPortfolio':
            //console.log("switch emloyment");
            $("#employmentGroup").addClass('active').siblings().removeClass('active');
             
            // setup desktop view
            ministerPortfolioView("michaelia-cash", "employmentPortfolioMCash");
            ministerPortfolioView("brendan-o-connor", "employmentPortfolioBOConnor"); 
            break;
        case 'resourcesPortfolio':
            //console.log("switch resources");
            $("#resourcesGroup").addClass('active').siblings().removeClass('active');
             
            // setup desktop view
            ministerPortfolioView("josh-frydenberg", "resourcesPortfolioJFrydenberg");
            ministerPortfolioView("gary-gray", "resourcesPortfolioGGray"); 
            break;             
        case 'tradePortfolio':
            //console.log("switch trade");
            $("#tradeGroup").addClass('active').siblings().removeClass('active');
            // setup desktop view

            ministerPortfolioView("steven-ciobo", "tradePortfolioSCiobo");
            ministerPortfolioView("penny-wong", "tradePortfolioPWong");
            
            break;             
        case 'transportPortfolio':
            //console.log("switch transport");
            $("#transportGroup").addClass('active').siblings().removeClass('active');
            // setup desktop view

            ministerPortfolioView("darren-chester", "transportPortfolioDChester");
            ministerPortfolioView("anthony-albanese", "transportPortfolioAAlbanese");
            
            break;              
        case 'environmentPortfolio':
            //console.log("switch environment");
            $("#environmentGroup").addClass('active').siblings().removeClass('active');
            // setup desktop view
            ministerPortfolioView("greg-hunt", "environmentPortfolioGHunt");
            ministerPortfolioView("mark-butler", "environmentPortfolioMButler");             
            break;
        case 'agriculturePortfolio':
            //console.log("switch environment");
            $("#agricultureGroup").addClass('active').siblings().removeClass('active');
            // setup desktop view
            ministerPortfolioView("barnaby-joyce", "agriculturePortfolioBJoyce");
            ministerPortfolioView("joel-fitzgibbon", "agriculturePortfolioJFitzgibbon");             
            break;             
        case 'healthPortfolio':
            //console.log("switch health");
            $("#healthGroup").addClass('active').siblings().removeClass('active');
             
            // setup desktop view
            ministerPortfolioView("sussan-ley", "healthPortfolioSLey");
            ministerPortfolioView("catherine-king", "healthPortfolioCKing");             
            break;
             
        case 'treasuryPortfolio':
            //console.log("switch treasury");
            $("#treasuryGroup").addClass('active').siblings().removeClass('active');
            
             //call function to fill out minister profile
            ministerPortfolioView("scott-morrison", "treasuryPortfolioSMorrison");
            ministerPortfolioView("kelly-o-dwyer", "treasuryPortfolioKODwyer"); 
            ministerPortfolioView("chris-bowen", "treasuryPortfolioCBowen");   
            break;
        case 'smallbusinessPortfolio':
            //console.log("switch Small Business");
            $("#smallbusinessGroup").addClass('active').siblings().removeClass('active');
            
             //call function to fill out minister profile
            ministerPortfolioView("kelly-o-dwyer", "businessPortfolioKOdwyer"); 
            ministerPortfolioView("michelle-rowland", "businessPortfolioMRowland");   
            break;              
        case 'immigrationPortfolio':
            //console.log("switch immigration");
            $("#immigrationGroup").addClass('active').siblings().removeClass('active');
            // setup desktop view
            ministerPortfolioView("peter-dutton", "immigrationPortfolioPDutton");
            ministerPortfolioView("richard-marles", "immigrationPortfolioRM");
             
            break;
        case 'foreignPortfolio':
            //console.log("switch foreign");
            $("#foreignGroup").addClass('active').siblings().removeClass('active');
    
            // setup desktop view
            ministerPortfolioView("julie-bishop", "foreignPortfolioJBishop");
            ministerPortfolioView("tanya-plibersek", "foriegnPortfolioTPlibersek");              
            break;
        case 'defencePortfolio':
            //console.log("switch defence");
            $("#defenceGroup").addClass('active').siblings().removeClass('active');
             
            // setup desktop view
            ministerPortfolioView("marise-payne", "defencePortfolioMPayne");
            ministerPortfolioView("stephen-conroy", "defencePortfolioSConroy");                 
            break;
        case 'communicationsPortfolio':
            //console.log("switch communications");
            $("#communicationsGroup").addClass('active').siblings().removeClass('active');

            // setup desktop view
            ministerPortfolioView("mitch-fifield", "communicationsPortfolioMFifield");
            ministerPortfolioView("jason-clare", "communicationsPortfolioJClare");             
            break;
        case 'artsPortfolio':
            //console.log("switch arts");
            $("#artsGroup").addClass('active').siblings().removeClass('active');

            // setup desktop view
            ministerPortfolioView("mitch-fifield", "artsPortfolioMFifield");
            ministerPortfolioView("mark-dreyfus", "artsPortfolioMDreyfus");             
            break;             
        case 'sciencePortfolio':
            //console.log("switch economics");
            $("#scienceGroup").addClass('active').siblings().removeClass('active');
            // setup desktop view
            ministerPortfolioView("christopher-pyne", "sciencePortfolioCPyne");
            ministerPortfolioView("kim-carr", "sciencePortfolioKCarr");             
            break;
        case 'legalPortfolio':
            //console.log("switch economics");
            $("#legalGroup").addClass('active').siblings().removeClass('active');
            // setup desktop view
            ministerPortfolioView("george-brandis", "legalPortfolioGBrandis");
            ministerPortfolioView("mark-dreyfus", "legalPortfolioMDreyfus");             
            break;
        case 'indigenousPortfolio':
            //console.log("switch indigenous");
            $("#indigenousGroup").addClass('active').siblings().removeClass('active');
            // setup desktop view
            ministerPortfolioView("nigel-scullion", "indigenousPortfolioNScullion");
            ministerPortfolioView("shayne-neumann", "indigenousPortfolioSNeumann");             
            break;
        case 'socialPortfolio':
            //console.log("switch social");
            $("#socialGroup").addClass('active').siblings().removeClass('active');
            // setup desktop view
            ministerPortfolioView("christian-porter", "socialPortfolioCPorter");
            ministerPortfolioView("jenny-macklin", "socialPortfolioJMacklin");             
            break;                 
    }     
    
}

// ========================================================================= //
// DOCUMENT READY FUNCTION 
jQuery(document).ready(function($) {
    

    // ********************* TABS MENU CLICK *********************
    // TABS CLICK- desktop
    jQuery('.tabs .tab-links a').on('click', function(e)  {
        currentTab = jQuery(this).attr('href');
        //console.log(currentTab);
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentTab).show().siblings().hide();

        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

        
        if (currentTab == portfolioTab) {
            $(".showPositionButton").css('display','none');
            $(".showNamesButton").css('display','none');
            
        } else {
            $(".showPositionButton").css('display','inline-block');
            $(".showNamesButton").css('display','inline-block');
        }        

        e.preventDefault();
    });
    
    // ********************* VIEW PORTFOLIO DETAILS CLICK *********************
    jQuery('.profileDetailButton').on('click', function(e)  {
        chosenMinister = jQuery(this).attr('id');
        //console.log("Portfolio details view - Chosen minister id: " + chosenMinister);
        
        // set scroll position
        scrollPosition = $(document).scrollTop();
         
        // hide profiles list and show chosen minister's details
        $(".minister-list-container").hide();
        $(".minister-portfolio-container").hide();        
        $(".minister-profile-container").show();
        
        //call function to fill out minister profile
        ministerProfileView(chosenMinister, ministerClickInsertID);
        
        // set scroll to top
        $(document).scrollTop(0);
        //$('body, html', parent.document).animate({ scrollTop: 0 },500);
        e.preventDefault();
    });
    
    // ********************* MINISTER CLICK *********************
    jQuery('.profile-photo').on('click', function(e)  {
        chosenMinister = jQuery(this).attr('id');
        //console.log("Chosen minister id: " + chosenMinister);
        
        // set scroll position
        scrollPosition = $(document).scrollTop();
        //console.log("Profile Detail Scroll Position: " + scrollPosition);
         
        // hide profiles list and show chosen minister's details
        $(".minister-list-container").hide();
        $(".minister-portfolio-container").hide();        
        $(".minister-profile-container").show();
        
        //call function to fill out minister profile
        ministerProfileView(chosenMinister, ministerClickInsertID);
        
        // set scroll to top
        $(document).scrollTop(0);        
        //$('body, html', parent.document).animate({ scrollTop: 0 },500);
        e.preventDefault();
    });
    
    // ********************* PORTFOLIO CLICK ***********************

    jQuery('.portfolioButton').on('click', function(e)  {
        
        chosenPortfolio = jQuery(this).attr('id');
        //console.log("Chosen Portfolio: " + chosenPortfolio);

        // set scroll position
        scrollPosition = $(document).scrollTop();
        
        // hide profiles list and show chosen minister's details
        $(".minister-list-container").hide();        
        $(".minister-profile-container").hide();
        $(".minister-portfolio-container").show();        
        
        // set view
        setPortfolioView(chosenPortfolio);
        
        e.preventDefault();
    });    
    
    
    // ************ MINISTER DETAILS BACK BUTTON CLICK **********
    jQuery('#back-tab').on('click', function(e)  {
        
       //console.log("Back button - details");
        
        if (currentTab != portfolioTab) {
            // hide profiles and show details 
            $(".minister-list-container").show();
            $(".minister-profile-container").hide();            
        } else {
            // show previous portfolio
        // hide profiles list and show chosen minister's details
            $(".minister-list-container").hide();        
            $(".minister-profile-container").hide();
            $(".minister-portfolio-container").show();                
            setPortfolioView(chosenPortfolio);
        }        
        
        // Set scroll position to previous location
        if(scrollPosition !="") {
            //$(window).scrollTop(scrollPosition);
            //$("html,body").scrollTop(scrollPosition);
            $(document).scrollTop(scrollPosition);
        }         
        e.preventDefault();
    });
    
        // ************ MINISTER DETAILS BOTTOM BACK BUTTON CLICK **********
    jQuery('#bottom-back-tab').on('click', function(e)  {
        
       //console.log("Back button - details");
        
        if (currentTab != portfolioTab) {
            // hide profiles and show details 
            $(".minister-list-container").show();
            $(".minister-profile-container").hide();            
        } else {
            // show previous portfolio
        // hide profiles list and show chosen minister's details
            $(".minister-list-container").hide();        
            $(".minister-profile-container").hide();
            $(".minister-portfolio-container").show();                
            setPortfolioView(chosenPortfolio);
        }        
        
        // Set scroll position to previous location
        if(scrollPosition !="") {
            //$(window).scrollTop(scrollPosition);
            //$("html,body").scrollTop(scrollPosition);
            $(document).scrollTop(scrollPosition);
        }         
        e.preventDefault();
    });
    
    // ************ PORTFOLIO MINISTER BACK BUTTON CLICK **********
    jQuery('#back-tab-portfolio').on('click', function(e)  {
        
       //console.log("Back button - portfolio");
        
        $(".minister-list-container").show();
        $(".minister-portfolio-container").hide();
        
        // Set scroll position to previous location
        if(scrollPosition !="") {
            //$("html,body").scrollTop(scrollPosition);
            $(document).scrollTop(scrollPosition);
        }         
        e.preventDefault();
    });
    
   
    // ************ SHOW NAMES BUTTON CLICK **********
    jQuery('.showNamesButton').on('click', function(e)  {
        
        if (namesShowHide == "hide") {
            namesShowHide = "show";
            $('.profile-photo-name').css('display','inline');
            $('.showNamesButton').empty();
            $('.showNamesButton').append("Hide names");
            
        } else {
            namesShowHide = "hide";
            $('.profile-photo-name').css('display','none');
            $('.showNamesButton').empty();
            $('.showNamesButton').append("Show names");            
        }         
        e.preventDefault();
    });    
   
    // ************ SHOW POSITIONS BUTTON CLICK **********
    jQuery('.showPositionButton').on('click', function(e)  {
        
        
        if (positionShowHide == "hide") {
            positionShowHide = "show";
            $('.profile-position').css('display','inline');
            $('.showPositionButton').empty();
            $('.showPositionButton').append("Hide titles");
            
        } else {
            positionShowHide = "hide";
            $('.profile-position').css('display','none');
            $('.showPositionButton').empty();
            $('.showPositionButton').append("Show titles");            
        }         
        e.preventDefault();
    });
    
    // ********************* SEAT EXPAND BUTTON CLICK *********************
    $(".profileSeatButton").on('click', function(e)  {
        
        //console.log("Seat expand button");
        var clickID = jQuery(this).attr('id');
        var parentClickID = jQuery(this).parent().attr('id');
        
        if (seatShowHide == "hide") {
            // show seat
            $("#" + parentClickID + " .ministerSeatDetails").css("display","inline-block");
           // $("#seatMapContainer").css("display","inline-block");
            
            seatShowHide = "show";
            
            // update '+' symbol to '-'
            $("#" + clickID + " .seatExpand").empty();
            $("#" + clickID + " .seatExpand").append('-');
            
            // update instructions
            $("#" + clickID + " .seatExpandInfo").empty();
            $("#" + clickID + " .seatExpandInfo").append('close');             
            
        } else {
            // hide analysis
            $("#" + parentClickID + " .ministerSeatDetails").css("display","none");
            seatShowHide = "hide";
            
            // update '+' symbol to '-'
            $("#" + clickID + " .seatExpand").empty();
            $("#" + clickID + " .seatExpand").append('+');
            
            // update instructions
            $("#" + clickID + " .seatExpandInfo").empty();
            $("#" + clickID + " .seatExpandInfo").append('expand');             
            
        }
        e.preventDefault();
    });     
    
    // ********************* ANALYSIS EXPAND BUTTON CLICK *********************
    $(".profileAnalysisButton").on('click', function(e)  {
        
        //console.log("Analysis expand button");
        
        var clickID = jQuery(this).attr('id');        
        var parentClickID = jQuery(this).parent().attr('id');
        
        if (analysisShowHide == "hide") {
            
            //console.log("Currently hidden, so set display to inline-block:");
            // show analysis
            $("#" + parentClickID + " .ministerAnalysis").css("display","inline-block");
            
            // update analysisShowHide
            analysisShowHide = "show";
            
            // update '+' symbol to '-'
            $("#" + clickID + " .analysisExpand").empty();
            $("#" + clickID + " .analysisExpand").append('-');
            
            // update instructions
            $("#" + clickID + " .analysisExpandInfo").empty();
            $("#" + clickID + " .analysisExpandInfo").append('close');            
             
        } else {
            // hide analysis
            $("#" + parentClickID + " .ministerAnalysis").css("display","none");
            
            // update analysisShowHide
            analysisShowHide = "hide";
            
            // update '-' symbol to '+'
            $("#" + clickID + " .analysisExpand").empty();
            $("#" + clickID + " .analysisExpand").append('+');

            // update instructions
            $("#" + clickID + " .analysisExpandInfo").empty();
            $("#" + clickID + " .analysisExpandInfo").append('expand');              
            
            // move scroll position to top of page
            //$("#page").scrollTop(0);
            $("html,body").scrollTop(0);
        }
        e.preventDefault();
    });     
    
});