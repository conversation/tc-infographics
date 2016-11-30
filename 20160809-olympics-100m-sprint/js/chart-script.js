// GLOBAL VARS
var TC_VARS = {
    mensData : [],
    womensData : [],
    mensTimes: [],
    womensTimes: [],    
    times: [],
    data : [],
    fastestTime : 0,
    slowestTime : 0,
    fastestMan : 0,    
    slowestMan : 0,
    fastestWoman : 0,    
    slowestWoman : 0,    
    currentRace : 'mens100m',
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
    views : {race: 'race', fastestTime: 'fastest'},
    races : {mens: 'mens100m', womens: 'womens100m'},
    chartMargin : {top: 20, right: 20, bottom: 50, left: 40},
    tcColours : {red: '#da352a', blue: '#4a90e2', green: '#50e3c2', orange: '#f5a623', grey: '#727272'}
}
/* -------------- funtion: showMensFastestImage ---------------- */

function showMensFastestImage () {
        // show womens fastest time image and text
        $("#mensFastestTimeText").addClass('active').siblings().removeClass('active');             
        $("#mensFastestImg").addClass('active').siblings().removeClass('active');  
}

/* -------------- funtion: showWomensFastestImage ---------------- */

function showWomensFastestImage () {
        // show womens fastest time image and text
        $("#womensFastestTimeText").addClass('active').siblings().removeClass('active');             
        $("#womensFastestImg").addClass('active').siblings().removeClass('active');  
}

/* -------------- funtion: hideMensFastestImage ---------------- */

function hideMensFastestImage () {
        // show womens fastest time image and text
        $("#mensFastestTimeText").removeClass('active');             
        $("#mensFastestImg").removeClass('active');  
}

/* -------------- funtion: hideWomensFastestImage ---------------- */

function hideWomensFastestImage () {
        // show womens fastest time image and text
        $("#womensFastestTimeText").removeClass('active');             
        $("#womensFastestImg").removeClass('active');  
}

/* ----------------------------------- function startResetButton ------------------------------ */

function startResetButton() {
    // if start is pressed, then switch to reset
    if( $('#startRace').html === 'Start race' ) {
        $('#startRace').empty();
        $('#startRace').append('Reset');
    } else {
        $('#startRace').empty();
        $('#startRace').append('Start race');        
    }
}

/* -------------- function: resetVars -------------------- */
function getTooltipX(pageX) {
    if ((pageX + TC_CONST.tooltipWidth + TC_CONST.tooltipPadding) > TC_VARS.winWidth) {
        return ((pageX - TC_CONST.tooltipWidth - TC_CONST.tooltipPadding) + "px");
    } else {
        return ((pageX + TC_CONST.tooltipPadding) + "px");    
    }
}

/* -------------- function: resetVars -------------------- */
function resetVariables() {
    // clear current drawing
    $('svg').empty();
    
    // clear data
    //TC_VARS.data = [];
    //TC_VARS.times = [];
}

/* ----------------------------------- function setDotColour ------------------------------ */

function setDotColour(data) {
    
    if (TC_VARS.currentRace == TC_CONST.races.mens) {
        if (data.time === TC_VARS.fastestMan) {
            return TC_CONST.tcColours.red;
        } else if (data.time === TC_VARS.slowestMan) {
            return TC_CONST.tcColours.orange;
        } else {
            return TC_CONST.tcColours.blue;
        }            
    } else if (TC_VARS.currentRace == TC_CONST.races.womens) {
        if (data.time === TC_VARS.fastestWoman) {
            return TC_CONST.tcColours.red;
        } else if (data.time === TC_VARS.slowestWoman) {
            return TC_CONST.tcColours.orange;
        } else {
            return TC_CONST.tcColours.blue;
        }
    }

}

/* ----------------------------------- function drawRace ------------------------------ */

function drawRace() {
   var width = TC_VARS.winWidth - TC_CONST.chartMargin.left - TC_CONST.chartMargin.right,
    height = TC_VARS.winHeight - TC_CONST.chartMargin.top - TC_CONST.chartMargin.bottom;

    // setup x 
    var xValue = function(d) { return 100;}, // data -> value
        xScale = d3.scale.linear().range([0, (width - TC_CONST.chartMargin.right)]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    // setup y
    var yValue = function(d) { return d.year;}, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("right").tickFormat(d3.format("d"));
  
    // add the graph canvas to the body of the webpage
    var svg = d3.select("svg");
    
    // add the tooltip area to the webpage
    var tooltip = d3.select(".tooltip")
        .style("opacity", 0);

    var data = [];
    // load data
    if (TC_VARS.currentRace === TC_CONST.races.mens) {
        data = TC_VARS.mensData;
    } else {
       data = TC_VARS.womensData; 
    } 
    
    xScale.domain([0, 100]);
    yScale.domain([1896, 2012]); 
    
    // move dots
    svg.selectAll(".dot")
        .data(data)
        .transition()
        .duration(function(d) {return (+d.time*1000); })
        .ease("linear")
        .attr("cx", xMap);
}

/* ----------------------------------- function drawRaceStart ------------------------------ */


function drawRaceStart(race) {
   var width = TC_VARS.winWidth - TC_CONST.chartMargin.left - TC_CONST.chartMargin.right,
    height = TC_VARS.winHeight - TC_CONST.chartMargin.top - TC_CONST.chartMargin.bottom;
    
    // y axis meter marker points
    var meterMarker = [10,20,30,40,50,60,70,80,90,100];
    
    //var yearsToHighlight = [1896,1968,1988,2012];

    // setup x 
    var xValue = function(d) { return d.distance; }, // data -> value
        xScale = d3.scale.linear().range([0, (width - TC_CONST.chartMargin.right - TC_CONST.chartMargin.left)]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    // setup y
    var yValue = function(d) { return d.year;}, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(d3.format("d"));

     var yMarkers = d3.svg.axis()
             .scale(yScale)
                    .ticks(0)
                    .tickSize(0)
                    .orient('left');

    // add the tooltip area to the webpage
    var tooltip = d3.select(".tooltip")
        .style("opacity", 0);
    
    // add the graph canvas to the body of the webpage
    var svg = d3.select("svg")
        .attr("width", TC_VARS.winWidth)
        .attr("height", TC_VARS.winHeight)
    .append("g")
        .attr("transform", "translate(" + TC_CONST.chartMargin.left + "," + TC_CONST.chartMargin.top + ")");

    // file location based on gender
    // load data

    var data = [];
    // load data
    if (race === TC_CONST.races.mens) {
        data = TC_VARS.mensData;
    } else {
       data = TC_VARS.womensData; 
    }    
        
    // don't want dots overlapping axis, so add in buffer to data domain
    // race start at 0m and race end at 100m
    xScale.domain([0, 100]);
    yScale.domain([1896, 2012]);        
        
    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + TC_CONST.chartMargin.left + ", " + (height + TC_CONST.padding) + ")")
        .call(xAxis)
    .append("text")
        .attr("class", "label")
        .attr("x", (width - TC_CONST.chartMargin.right - TC_CONST.padding))
        .attr("y", 35)
        .style("text-anchor", "end")
        .text("Distance (m)");

    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (TC_CONST.chartMargin.left - TC_CONST.padding) + ",0)")
        .call(yAxis)
    .append("text")
        .attr("class", "label")
        .attr("y", -10)
        .attr("x", -10)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Year");

    // draw y markers
    for (var i=0; i < meterMarker.length; i++) {
        svg.append("g")
            .attr("class", "yMarker")
            .attr("transform", "translate(" + (TC_CONST.chartMargin.left + xScale(meterMarker[i])) + ",0)")
            .call(yMarkers);
    }        
        
    // draw dots
    svg.selectAll(".dot")
        .data(data)
    .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", TC_CONST.chartMargin.left)
        .attr("cy", yMap)
        //.style("fill", TC_CONST.tcColours.blue)
        .style("fill", function(d) { return setDotColour(d);})         
        .on("mouseover", function(d) {        
            tooltip.transition()
               .duration(200)
               .style("opacity", 1.0);
            tooltip.html(d.name + " (" + d.year + ", " + d.city + ")<br/> Time: " + d.time + "s")  
                //.style("left", (d3.event.pageX + 15) + "px")
                .style("left", function(d) { return getTooltipX(d3.event.pageX); })                
                .style("top", (d3.event.pageY - 10) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
}

/* ----------------------- function drawDefaultChart ------------------------------ */

function drawDefaultChart() {
    var width = TC_VARS.winWidth - TC_CONST.chartMargin.left - TC_CONST.chartMargin.right,
    height = TC_VARS.winHeight - TC_CONST.chartMargin.top - TC_CONST.chartMargin.bottom;

    var meterMarker = [80,90,100];
    // setup x 
    var xValue = function(d) { return d.distance;}, // data -> value
        //xScale = d3.scale.linear().range([0, (width - TC_CONST.chartMargin.right - TC_CONST.chartMargin.left)]),
        xScale = d3.scale.linear().range([TC_CONST.chartMargin.left, (width - TC_CONST.chartMargin.right - TC_CONST.chartMargin.left)]), 
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    // setup y
    var yValue = function(d) { return d.year;}, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(d3.format("d"));

     var yMarkers = d3.svg.axis()
             .scale(yScale)
                    .ticks(0)
                    .tickSize(0)
                    .orient('left');
    /*
    // setup fill color
    var cValue = function(d) { return d.place;},
        color = d3.scale.ordinal()
            .domain (["1", "2", "3"])
            .range(["#ffcc00","#cccccc","#b38600"]);
*/
    
    // add the graph canvas to the body of the webpage
    var svg = d3.select("svg")
        .attr("width", TC_VARS.winWidth)
        .attr("height", TC_VARS.winHeight)
    .append("g")
        .attr("transform", "translate(" + TC_CONST.chartMargin.left + "," + TC_CONST.chartMargin.top + ")");

    // add the tooltip area to the webpage
    var tooltip = d3.select(".tooltip")
        .style("opacity", 0);

    // load data - mens data
    d3.csv("data/mens100m-sprint.csv", function(error, data) {
        
        // check for eror on data load
        if (error) throw error;
        
        var j=0;
        // change string (from CSV) into number format
        data.forEach(function(d) {
            d.distance = +d.distance;
            d.time = +d.time;
            d.speed = +d.speed;
            d.year = +d.year;
            if (d.place === '1') {
                TC_VARS.mensData[j] = d;
                TC_VARS.mensTimes[j] = d.time;            
                j++;
            }
        });

        // set fastest and slowest times
        TC_VARS.fastestMan = d3.min(TC_VARS.mensTimes);
        TC_VARS.slowestMan = d3.max(TC_VARS.mensTimes);
        
        // don't want dots overlapping axis, so add in buffer to data domain
        xScale.domain([80, 100]);
        yScale.domain([1896, 2012]);

        
        // x-axis
        svg.append("g")
            .attr("class", "x axis")
           // .attr("transform", "translate(" + TC_CONST.chartMargin.left + ", " + (height + TC_CONST.padding) + ")")        
            .attr("transform", "translate(0, " + (height + TC_CONST.padding) + ")")
            .call(xAxis)
        .append("text")
            .attr("class", "label")
            .attr("x", (width - TC_CONST.chartMargin.right - TC_CONST.padding))
            .attr("y", 35)
            .style("text-anchor", "end")
            .text("Distance (m)");

        // y-axis
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (TC_CONST.chartMargin.left - TC_CONST.padding) + ",0)")
            .call(yAxis)
        .append("text")
            .attr("class", "label")
            .attr("y", -10)
            .attr("x", -10)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Year");
        
        // draw y markers
        for (var i=0; i < meterMarker.length; i++) {
            svg.append("g")
                .attr("class", "yMarker")
                .attr("transform", "translate(" + xScale(meterMarker[i]) + ",0)")
                .call(yMarkers);
        }         

        // draw dots
        svg.selectAll(".dot")
            .data(TC_VARS.mensData)
        .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 6)
            .attr("cx", xMap)
            .attr("cy", yMap)
            //.style("fill", function(d) { return color(cValue(d));}) 
            .style("fill", function(d) { return setDotColour(d);}) 
            .on("mouseover", function(d) {        
                tooltip.transition()
                   .duration(200)
                   .style("opacity", 1.0);
                tooltip.html(d.name + " (" + d.year + ", " + d.city + ")<br/> Time: " + d.time + "s" + "<br/> Distance run: " + d.distance + "m")
                //.style("left", (d3.event.pageX + 15) + "px")
                .style("left", function(d) { return getTooltipX(d3.event.pageX); })
                .style("top", (d3.event.pageY - 10) + "px");
          })
          .on("mouseout", function(d) {
              tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
          });
    });
    
    // load womens data
    d3.csv("data/womens100m-sprint.csv", function(error, data) {
        
        // check for eror on data load
        if (error) throw error;
        
        var j=0;
        // change string (from CSV) into number format
        data.forEach(function(d) {
            d.distance = +d.distance;
            d.time = +d.time;
            d.speed = +d.speed;
            d.year = +d.year;
            if (d.place === '1') {
                TC_VARS.womensData[j] = d;
                TC_VARS.womensTimes[j] = d.time;            
                j++;
            }
        });

        // set fastest and slowest times
        TC_VARS.fastestWoman = d3.min(TC_VARS.womensTimes);
        TC_VARS.slowestWoman = d3.max(TC_VARS.womensTimes);
    });
} 

/* ----------------------- function drawFastestChart ------------------------------ */

function showFastestChart(race) {
    var width = TC_VARS.winWidth - TC_CONST.chartMargin.left - TC_CONST.chartMargin.right,
    height = TC_VARS.winHeight - TC_CONST.chartMargin.top - TC_CONST.chartMargin.bottom;

    var meterMarker = [80,90,100];
    // setup x 
    var xValue = function(d) { return d.distance;}, // data -> value
        //xScale = d3.scale.linear().range([0, (width - TC_CONST.chartMargin.right - TC_CONST.chartMargin.left)]),
        xScale = d3.scale.linear().range([TC_CONST.chartMargin.left, (width - TC_CONST.chartMargin.right - TC_CONST.chartMargin.left)]), 
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    // setup y
    var yValue = function(d) { return d.year;}, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(d3.format("d"));

     var yMarkers = d3.svg.axis()
             .scale(yScale)
                    .ticks(0)
                    .tickSize(0)
                    .orient('left');
    
    // setup fill color
    var cValue = function(d) { return d.place;},
        color = d3.scale.ordinal()
            .domain (["1", "2", "3"])
            .range(["#ffcc00","#cccccc","#b38600"]);

    // add the graph canvas to the body of the webpage
    var svg = d3.select("svg")
        .attr("width", width + TC_CONST.chartMargin.left + TC_CONST.chartMargin.right)
        .attr("height", height + TC_CONST.chartMargin.top + TC_CONST.chartMargin.bottom)
    .append("g")
        .attr("transform", "translate(" + TC_CONST.chartMargin.left + "," + TC_CONST.chartMargin.top + ")");

    // add the tooltip area to the webpage
    var tooltip = d3.select(".tooltip")
        .style("opacity", 0);

    var data = [];
    // load data
    if (race === TC_CONST.races.mens) {
        data = TC_VARS.mensData;
    } else {
       data = TC_VARS.womensData; 
    }
        
    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([80, 100]);
    yScale.domain([1896, 2012]);

        
    // x-axis
    svg.append("g")
        .attr("class", "x axis")
       // .attr("transform", "translate(" + TC_CONST.chartMargin.left + ", " + (height + TC_CONST.padding) + ")")        
        .attr("transform", "translate(0, " + (height + TC_CONST.padding) + ")")
        .call(xAxis)
    .append("text")
        .attr("class", "label")
        .attr("x", (width - TC_CONST.chartMargin.right - TC_CONST.padding))
        .attr("y", 35)
        .style("text-anchor", "end")
        .text("Distance (m)");

    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (TC_CONST.chartMargin.left - TC_CONST.padding) + ",0)")
        .call(yAxis)
    .append("text")
        .attr("class", "label")
        .attr("y", -10)
        .attr("x", -10)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Year");
        
    // draw y markers
    for (var i=0; i < meterMarker.length; i++) {
        svg.append("g")
            .attr("class", "yMarker")
            .attr("transform", "translate(" + xScale(meterMarker[i]) + ",0)")
            .call(yMarkers);
    }         

    // draw dots
    svg.selectAll(".dot")
        .data(data)
    .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 6)
        .attr("cx", xMap)
        .attr("cy", yMap)
        //.style("fill", function(d) { return color(cValue(d));}) 
        .style("fill", function(d) { return setDotColour(d);}) 
        .on("mouseover", function(d) {        
            tooltip.transition()
               .duration(200)
               .style("opacity", 1.0);
            tooltip.html(d.name + " (" + d.year + ", " + d.city + ")<br/> Time: " + d.time + "s" + "<br/> Distance run: " + d.distance + "m")            
            //.style("left", (d3.event.pageX + 15) + "px")
            .style("left", function(d) { return getTooltipX(d3.event.pageX); })
            .style("top", (d3.event.pageY - 10) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
} 

/* -------------- funtion: submenu click ---------------- */
function processSubmenuClick(_this) {
        console.log("Sub menu clicked: " + _this.id);
        
        
        if(_this.id == 'fastestTime' ) {
            console.log("Fastest time clicked.");
            $("#fastestTime").addClass('active').siblings().removeClass('active');
            $('#raceSimulation').css('display','inline-block');             
            $('#startRace').css('display','none');
            $('#resetRace').css('display','none');
            // set view to fastest
            TC_VARS.currentView = 'fastest';
            
            // clear the svg
            resetVariables();
            // draw chart
            showFastestChart(TC_VARS.currentRace);
            
            // display background image and text
            if (TC_VARS.currentRace == TC_CONST.races.mens) {
                showMensFastestImage();
            } else {
                showWomensFastestImage(); 
            }
        } else if(_this.id == 'raceSimulation' ) {
            $("#startRace").addClass('active').siblings().removeClass('active');
            $('#startRace').css('display','inline-block');
            $('#raceSimulation').css('display','none');

            // empty svg and draw race start
            resetVariables();
            TC_VARS.currentView = 'race';        
            drawRaceStart(TC_VARS.currentRace);
            
            // hide image and text
            hideMensFastestImage();
            hideWomensFastestImage();

            
        } if(_this.id == 'startRace' ) {
            console.log("Start race clicked.");
            $('#resetRace').css('display','inline-block');
            $('#startRace').css('display','none');
            $("#resetRace").addClass('active').siblings().removeClass('active');                        
            // set the view to race and then draw race
            TC_VARS.currentView = 'race';    
            drawRace();
        } else if(_this.id == 'resetRace' ) {
            console.log("Reset race clicked.");            

            $('#startRace').css('display','inline-block');
            $('#resetRace').css('display','none');
            $("#startRace").addClass('active').siblings().removeClass('active');             
            resetVariables();
            TC_VARS.currentView = 'race';            
            drawRaceStart(TC_VARS.currentRace);
        }
}


/* -------------- funtion: main menu click ---------------- */

function processMenuClick(_this) {
    var divID = jQuery(_this).attr('id');
    console.log("div id " + divID);

    // update menu
    switch(divID) {
        case TC_CONST.races.mens:
            //update menu style
            $("#mens100m").toggleClass('active');
            $("#womens100m").removeClass('active');
            TC_VARS.currentRace = TC_CONST.races.mens;
            showMensFastestImage();               
            break;
        case TC_CONST.races.womens:
            //update menu style
            $("#womens100m").toggleClass('active');
            $("#mens100m").removeClass('active');
            // show womens fastest time image and text            
            showWomensFastestImage();            
            TC_VARS.currentRace = TC_CONST.races.womens;
            
            break;
    }
    // clear current drawing
    // clear data
    resetVariables();
    TC_VARS.currentView = 'fastest';
    // draw race start
    showFastestChart(TC_VARS.currentRace);
    
    // reset submenu
    $("#fastestTime").addClass('active').siblings().removeClass('active');        
    $('#raceSimulation').css('display','inline-block');
    $('#startRace').css('display','none');
    $('#resetRace').css('display','none');
        
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



/* -------------- funtion: resizeChart ---------------- */

function resizeChart() {
    // set default item to events
    var item = 'events';

    // get window properties
    getWindowSize();
    
    // update chart
    $('svg').empty();
    if (TC_VARS.currentView == TC_CONST.views.race) {
        drawRaceStart(TC_VARS.currentRace); 
    } else if (TC_VARS.currentView == TC_CONST.views.fastestTime) {
        showFastestChart(TC_VARS.currentRace);
    }
}

/* -------------- funtion: 'main' ---------------- */

$(document).ready(function() {
    
    // get window properties
    getWindowSize();    
    
    // set-up background images
    showMensFastestImage();
    
    // start with Mens 100m sprint
    drawDefaultChart();
    
    //drawFastestChart(TC_VARS.currentRace);
    
    //On main menu click, update with new data    
    $(".menu div").on('click', function(e) {
        processMenuClick(this);
    });    
    
    //On menu click, update with new data    
    $(".submenu div").on('click', function(e) {
        processSubmenuClick(this);
    });

    // on window resize, update chart
    $( window ).resize(function() {
        resizeChart();
    });    

});