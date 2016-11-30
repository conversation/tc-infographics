// GLOBAL VARS
var TC_VARS = {
    data : null,
    winWidth : 756,
    winHeight : 500
}

// GLOBAL CONSTS
var TC_CONST = {
    heightMultiplier : 0.5625,
    maxChartWidth : 756,
    maxChartHeight : 425,
    chartMargin : {top: 20, right: 20, bottom: 30, left: 50}
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
    
    // determine which item is being displayed
    if ($('.menu').children().eq(1).hasClass('active')) {
        item = 'countries';
    } else if ($('.menu').children().eq(2).hasClass('active')) {
        item = 'athletes';
    }
    
    // update chart
    updateChart(item);    
}

/* -------------- funtion: updateChart ---------------- */

function updateChart(item) {
    // get window properties
    getWindowSize();
    
    // get svg dimensions
    
    if ($("svg") != null) {
        var svgWidth = parseInt(d3.select("svg").style("width")),
        svgHeight = parseInt(d3.select("svg").style("height"));
        
        //console.log("Update size: SVG width = " + svgWidth);
        //console.log("Update size: SVG height = " + svgHeight);        
    }
    
    var width = TC_VARS.winWidth - TC_CONST.chartMargin.left - TC_CONST.chartMargin.right,
        height = TC_VARS.winHeight - TC_CONST.chartMargin.top - TC_CONST.chartMargin.bottom;    

    // update the svg element's dimensions
    $('svg').width(TC_VARS.winWidth);
    $('svg').height(TC_VARS.winHeight);
    
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);
    
    // set x domain to length of data set (number of years)
    x.domain(TC_VARS.data.map(function(d) { return d.year; }));
    // set y domain to the max number of events (301)
    y.domain([0, d3.max(TC_VARS.data, function(d) { return d[item]; })]);    
    
    // updates bars
    var svg = d3.selectAll("rect")   
        .data(TC_VARS.data)
        .transition()
        .delay(function(d, i) {
            return i / TC_VARS.data.length * 1000;   // <-- Where the magic happens
        })
        .duration(500)
        .ease("cubic-in-out")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.year); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d[item]); })
            .attr("height", function(d) { return height - y(d[item]); });
    
    
    //listen for mouseover
    var chart = d3.selectAll("rect")
        .on("mouseover", function(d) {
            //Get this bar's x/y values, then augment for the tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) + x.rangeBand() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 15;

            d3.select("#valueTooltip")
                .style("left", "100px")
                .style("top", "80px")		
                .select("#value")
                .text(d[item] + " " + item);
            
            d3.select("#cityTooltip")
                .style("left", "100px")
                .style("top", "65px")			
                .select("#city")
                .text(d.city + ", " + d.year);
            
                //Show the city name tooltip
                d3.select("#cityTooltip").classed("hidden", false);
                d3.select("#valueTooltip").classed("hidden", false);            
           })
           .on("mouseout", function() {
                //Remove the tooltip
                d3.select("#valueTooltip").classed("hidden", true);
                //Show the city tooltip
                d3.select("#cityTooltip").classed("hidden", true);
           });
    
        // update ticks   
        if (TC_VARS.winWidth < 480) {
            xAxis.tickValues(x.domain().filter(function(d, i) { return !(i % 4); }));
        } else {
            xAxis.tickValues(x.domain().filter(function(d, i) { return !(i % 2); }));
        }
        
        // calculate y ticks
        yAxis.ticks(Math.max(height/20, 2)); 
  
        // update y axis
        d3.select(".y")
            .call(yAxis)
            .select("#yLabel")
                .text("Number of " + item);
    
        // update x axis
        d3.select(".x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
}

/* -------------- funtion: drawDefaultChart ---------------- */

function drawDefaultChart() {

    var width = TC_VARS.winWidth - TC_CONST.chartMargin.left - TC_CONST.chartMargin.right,
        height = TC_VARS.winHeight - TC_CONST.chartMargin.top - TC_CONST.chartMargin.bottom;     

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    // update the svg element's dimensions
    $('svg').width(TC_VARS.winWidth);
    $('svg').height(TC_VARS.winHeight);
    
    // select svg element
    var svg = d3.select("svg")
        .append("g")
            .attr("transform", "translate(" + TC_CONST.chartMargin.left + "," + TC_CONST.chartMargin.top + ")");

    // Load data
    d3.csv("data/summer-olympics-data.csv", function(error, data) {
        // check for eror on data load
        if (error) throw error;
        
        // if no error, continue...
        // convert type events/countries/athletes to number
        data.forEach(function(d) {
            d.events = +d.events;
            d.athletes = +d.athletes;
            d.countries = +d.countries;
        });
        
        // assign converted data to global vars
        TC_VARS.data = data;
        
        // set x domain to length of data set (number of years)
        x.domain(data.map(function(d) { return d.year; }));
        // set y domain to the max number of events (301)
        y.domain([0, d3.max(data, function(d) { return d.events; })]);

        // calculate x-ticks 
        if (TC_VARS.winWidth < 480) {
            xAxis.tickValues(x.domain().filter(function(d, i) { return !(i % 4); }));
        } else {
            xAxis.tickValues(x.domain().filter(function(d, i) { return !(i % 2); }));
        }
        
        // calculate y ticks
        yAxis.ticks(Math.max(height/20, 2)); 
        
        // set-up x axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // set-up y axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
        .append("text")
            .attr("id","yLabel")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".75em")
            .style("text-anchor", "end")
            .text("Number of events");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.year); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d.events); })
                .attr("height", function(d) { return height - y(d.events); })
			 .on("mouseover", function(d) {
                 //Get this bar's x/y values, then augment for the tooltip
                 var xPosition = parseFloat(d3.select(this).attr("x")) + x.rangeBand() / 2;
                 var yPosition = parseFloat(d3.select(this).attr("y")) + 15;
					//Create the tooltip label
                    d3.select("#valueTooltip")
						.style("left", "100px")
						.style("top", "80px")						
						.select("#value")
						.text(d.events + " events");
            
                    d3.select("#cityTooltip")
						.style("left", "100px")
						.style("top", "65px")
						.select("#city")
						.text(d.city + ", " + d.year);
            
                    //Show the city name tooltip
				    d3.select("#cityTooltip").classed("hidden", false);
                    d3.select("#valueTooltip").classed("hidden", false);
			   })
			   .on("mouseout", function() {
					//Remove the tooltip
					d3.select("#tooltip").remove();
                    //Show the city tooltip
				    d3.select("#cityTooltip").classed("hidden", true);
                    d3.select("#valueTooltip").classed("hidden", true);            
			   });        
    });
}

/* -------------- funtion: menu click ---------------- */
function processMenuClick(_this) {
    var divID = jQuery(_this).attr('id');
    console.log("div id " + divID);
    
    switch(divID) {
        case 'numEvents':
            updateChart('events');

            //update menu style
            $("#numEvents").addClass('active').siblings().removeClass('active');
            break;
        case 'numCountries':
            // draw chart
            updateChart('countries');

            //update menu style
            $("#numCountries").addClass('active').siblings().removeClass('active');
            break;
        case 'numAthletes':
            // draw chart
            updateChart('athletes');
        
            //update menu style
            $("#numAthletes").addClass('active').siblings().removeClass('active');            
            break;
    }
}


/* -------------- funtion: 'main' ---------------- */

$(document).ready(function() {
    
    // get window size
    getWindowSize();

    // default chart - number of events
    drawDefaultChart();
    
    //On menu click, update with new data    
    $(".menu div").on('click', function(e) {
        processMenuClick(this);
    });
    
    // on window resize, update chart
    //d3.select(window).on('resize', resizeChart);
    $( window ).resize(function() {
        resizeChart();
    });
    
});