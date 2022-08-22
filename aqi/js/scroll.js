// var bdate = "20180601"
// var edate = "20180630"

// var pmurl = `data/pm10_20.csv`
// var ozurl = `data/o3_20.csv`
// var courl = `data/co_20.csv`
// var sourl = `data/so2_20.csv`
// var nourl = `data/no2_20.csv`
var alldata = `data/values.csv`
// Set up our chart
var svgWidth = 1011;
var svgHeight = 777;
var margin = { top: 30, right: 40, bottom: 100, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var parseDate = d3.timeParse("%Y-%m-%d")
var formatDate = d3.timeFormat("%B %d, %Y")


d3.csv(alldata).then(alldata => {
    // Zoom Function 
    function zoomFunction(){
        // create new scale ojects based on event
        var new_xScale = d3.event.transform.rescaleX(xScale)
        var new_yScale = d3.event.transform.rescaleY(yScale)
        console.log(d3.event.transform)
        
        // update axes
        gX.call(xAxis.scale(new_xScale));
        gY.call(yAxis.scale(new_yScale));
        
        // update circle
        circles.attr("transform", d3.event.transform)
        };
    

    var zoom = d3.zoom()
        .on("zoom", zoomFunction);

    // Create an SVG wrapper, append an svg that will hold our chart and shift the latter by left and top margins
    var svg = d3.select("#chart")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);


    var chart = svg.append("g")
        .call(zoom);

    //All of the "official" pollutants in our area
    var pollutants = [
        {pollutant: "81102", color: '#a50f15'},
        {pollutant: "44201", color: '#08519c'},
        {pollutant: "42101", color: '#006d2c'},
        {pollutant: "42401", color: '#ffe15d'},
        {pollutant: "42602", color: '#d94801'},
        {pollutant: "all", color: '#54278f'},
        {pollutant: "not", color: '#808080'}
    ];

    // Initialize tooltip
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .html(function(d){
            var date = formatDate(parseDate(d.Date))
            // var parameter = d.parameter;
            // var units = d.units;
            if (d.parameter==="81102"){return (`PM10 Measures ${d.pm10} Micrograms Per Cubic Meter<hr>${date}`)}
            else if (d.parameter==="44201"){return (`Ozone Measures ${d.o3} Parts Per Million<hr>${date}`)}
            else if (d.parameter==="42101"){return (`CO Measures ${d.co} Parts Per Million<hr>${date}`)}
            else if (d.parameter==="42401"){return (`SO2 Measures ${d.so2} Parts Per Billion<hr>${date}`)}
            else if (d.parameter==="42602"){return (`NO2 Measures ${d.no2} Parts Per Billion<hr>${date}`)}
        });

    
    // Create tooltip
    chart.call(toolTip);


    // define scale functions(range)
    var xScale = d3.scaleTime().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);

    // define axis functions
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // these variables store the min and max values in a column in data.csv
    var xRan;
    var yMin;
    var yMax;
    var currentAxisLabelY;
    // create a function to identify min, max values of a column in data.csv which in turn
    // assigns the results to the variables created above
    function findMinAndMax(data) {
        xRan = d3.extent(data, function (d) { 
            if (currentAxisLabelY==='PM10' && typeof d.pm10==='number'){return parseDate(d.Date)}
            else if (currentAxisLabelY==='O3' && typeof d.o3==='number'){return parseDate(d.Date)}
            else if (currentAxisLabelY==='CO' && typeof d.co==='number'){return parseDate(d.Date)}
            else if (currentAxisLabelY==='SO2' && typeof d.so2==='number'){return parseDate(d.Date)}
            else if (currentAxisLabelY==='NO2' && typeof d.no2==='number'){return parseDate(d.Date)}
            else return parseDate(d.Date)});
        yMin = d3.min(data, function (d) {
            if (currentAxisLabelY==='PM10'){return [d.pm10]}
            else if (currentAxisLabelY==='O3'){return [d.o3]}
            else if (currentAxisLabelY==='CO'){return [d.co]}
            else if (currentAxisLabelY==='SO2'){return [d.so2]}
            else if (currentAxisLabelY==='NO2'){return [d.no2]} 
            else return d3.min([d.o3, d.co, d.so2, d.no2, d.pm10])});
        yMax = d3.max(data, function (d) { 
            if (currentAxisLabelY==='PM10'){return [d.pm10]}
            else if (currentAxisLabelY==='O3'){return [d.o3]}
            else if (currentAxisLabelY==='CO'){return [d.co]}
            else if (currentAxisLabelY==='SO2'){return [d.so2]}
            else if (currentAxisLabelY==='NO2'){return [d.no2]}  
            else return d3.max([d.o3, d.co, d.so2, d.no2, d.pm10])});
    };
    
    // set the default x-axis
    var defaultAxisLabelX = "Date"

    // set the default y-axis
    var defaultAxisLabelY = "PM10"

    // call the findMinAndMax() on the default X Axis
    findMinAndMax(alldata) 

    // set the domain of the axes
    xScale.domain(xRan);
    yScale.domain([yMin, yMax])


    var pollutantGradients = svg.append("defs").selectAll("radialGradient")
        .data(pollutants)
        .enter().append("radialGradient")
        //Create a unique id per "pollutant"
        .attr("id", function(d){return d.pollutant;})
        .attr("cx", "35%") //Move the x-center location towards the left
        .attr("cy", "35%") //Move the y-center location towards the top
        .attr("r", "60%"); //Increase the size of the "spread" of the gradient

    //Add colors to the gradient
    //First a lighter color in the center
    pollutantGradients.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", function(d) {
        return d3.rgb(d.color).brighter(1);
    });

    //Then the actual color almost halfway
    pollutantGradients.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", function(d) {
        return d.color;
    });

    //Finally a darker color at the outside
    pollutantGradients.append("stop")
    .attr("offset",  "100%")
    .attr("stop-color", function(d) {
        return d3.rgb(d.color).darker(1.75)
    })


    // create chart
    var view = chart.append("rect")
        .attr("class", "zoom")
        .attr("width", width)
        .attr("height", height)
        .call(zoom)


    var circles = chart.selectAll("circle")
        .data(alldata)
        .enter()
        .append("circle")
        .attr("id","circles")
        .attr("cx", function (d) {
            // var date = parseDate(d.Date)
            // var time = formatTime(d.Time)
            return xScale(parseDate(`${d.Date}`));
        })
        .attr("cy", function (d) {
            // var parameter = d.parameter
            if (d.parameter==="81102"){return yScale(`${d.pm10}`)}
            else if (d.parameter==="44201"){return yScale(`${d.o3}`)}
            else if (d.parameter==="42101"){return yScale(`${d.co}`)}
            else if (d.parameter==="42401"){return yScale(`${d.so2}`)}
            else if (d.parameter==="42602"){return yScale(`${d.no2}`)};
        })
        .attr("r", 5)
        .attr("fill", "url(#all)")
        .attr("opacity", 1)
        // display tooltip on click
        .on("mouseover", function (d) {
            var x = d.parameter
            d3.select(this).style("cursor", "pointer")
            toolTip.style("background", function(){
                if (x === "81102"){return "#a50f15"}
                else if (x ==="44201"){return '#08519c'}
                else if (x ==="42101"){return '#006d2c'}
                else if (x ==="42401"){return '#ffe15d'}
                else if (x ==="42602"){return '#d94801'}
            })
            toolTip.show(d);
        })
        // hide tooltip on mouseout
        .on("mouseout", function (d) {
            d3.select(this).style("cursor", "default")
            toolTip.hide(d);
        })
    // create x-axis
    var gX = chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

    // create y-axis
    var gY = chart.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(-10,0)`)
        .call(yAxis)

    

    

    // add x-axis titles
    chart.append("text")
        .attr("transform", `translate(${width / 2},${height + 40})`)
        // This axis label is active by default
        .attr("class", "axis-text-x active")
        .attr("data-axis-name", "Date")
        .text("Time");



    // add y-axis titles
    chart.append("text")
        .attr("transform", `translate(-70,495)rotate(270)`)
        .attr("id",'ALL')
        .attr("class", "axis-text-y active")
        .attr("data-axis-name", 'ALL')
        .text("All");
    
    chart.append("text")
        .attr("transform", `translate(-40,470)rotate(270)`)
        .attr("id",'O3')
        .attr("class", "axis-text-y inactive")
        .attr("data-axis-name", 'O3')
        .text("Ozone");


    chart.append("text")
        .attr("transform", `translate(-70,435)rotate(270)`)
        .attr("id",'CO')
        .attr("class", "axis-text-y inactive")
        .attr("data-axis-name", 'CO')
        .text("Carbon Monoxide");
    
    chart.append("text")
        .attr("transform", `translate(-40,350)rotate(270)`)
        .attr("id",'SO2')
        .attr("class", "axis-text-y inactive")
        .attr("data-axis-name", 'SO2')
        .text("Sulfur Dioxide");

    chart.append("text")
        .attr("transform", `translate(-70,240)rotate(270)`)
        .attr("id",'NO2')
        .attr("class", "axis-text-y inactive")
        .attr("data-axis-name", 'NO2')
        .text("Nitrogen Dioxide");

    chart.append("text")
        .attr("transform", `translate(-40,180)rotate(270)`)
        .attr("id",'PM10')
        .attr("class", "axis-text-y inactive")
        .attr("data-axis-name", 'PM10')
        .text("PM10 Total 0-10um");

    // active-inactive toggle x axis
    function labelChangeX(clickedAxis) {
        d3.selectAll(".axis-text-x")
            .filter(".active")
            .classed("active", false)
            .classed("inactive", true);

        clickedAxis.classed("inactive", false).classed("active", true);
    }

    // active-inactive toggle y axis
    function labelChangeY(clickedAxis) {
        d3.selectAll(".axis-text-y")
            .filter(".active")
            .classed("active", false)
            .classed("inactive", true);

        clickedAxis.classed("inactive", false).classed("active", true);

    }

    d3.selectAll(".axis-text-y").on("mouseover", function() {
          d3.select(this).style("cursor", "pointer"); 
        })
    d3.selectAll(".axis-text-y").on("mouseout", function() {
        d3.select(this).style("cursor", "default"); 
        })
        
    // On click events for the y-axis
    d3.selectAll(".axis-text-y").on("click", function () {

        // assign the variable to the current axis
        var clickedSelection = d3.select(this);
        var isClickedSelectionInactive = clickedSelection.classed("inactive");
        console.log("this axis is inactive", isClickedSelectionInactive)
        var clickedAxis = clickedSelection.attr("data-axis-name");
        console.log("current axis: ", clickedAxis);

        if (isClickedSelectionInactive) {
            
            currentAxisLabelY = clickedAxis;

            findMinAndMax(alldata);

            yScale.domain([yMin, yMax]);

            // create y-axis
            svg.select(".y-axis")
                .transition()
                .duration(1000)
                .ease(d3.easeLinear)
                .call(yAxis)


            d3.selectAll("circle")
                .transition()
                .duration(1000)
                .ease(d3.easeLinear)
                .on("start", function () {
                    d3.select(this)
                        .attr("r", 5)
                        .attr("fill", function(d) {
                            return `url(#${d.parameter})`;
                        })
                        .attr("opacity", 1);

                })
                .attr("cx", function (d) {
                    // var date = parseDate(d.Date)
                    // var time = formatTime(alldata.Time)
                    return xScale(parseDate(`${d.Date}`));
                })
                .attr("cy", function (d) {
                    if (d.parameter==="81102"){return yScale(`${d.pm10}`)}
                    else if (d.parameter==="44201"){return yScale(`${d.o3}`)}
                    else if (d.parameter==="42101"){return yScale(`${d.co}`)}
                    else if (d.parameter==="42401"){return yScale(`${d.so2}`)}
                    else if (d.parameter==="42602"){return yScale(`${d.no2}`)};
                })
                .on("end", function () {
                    d3.select(this)
                        .transition()
                        .duration(1000)
                        .attr("r", 5)
                        .attr("fill", function(d) {
                            if (currentAxisLabelY==='O3' && d.parameter==="44201"){return `url(#${d.parameter})`}
                            else if (currentAxisLabelY==='CO' && d.parameter==="42101"){return `url(#${d.parameter})`}
                            else if (currentAxisLabelY==='PM10' && d.parameter==="81102"){return `url(#${d.parameter})`}
                            else if (currentAxisLabelY==='SO2' && d.parameter==="42401"){return `url(#${d.parameter})`}
                            else if (currentAxisLabelY==='NO2' && d.parameter==="42602"){return `url(#${d.parameter})`}
                            else if (currentAxisLabelY==='ALL'){return `url(#all)`}
                            else return 'url(#not)';
                        })
                        .attr("opacity", 1);
                })


            labelChangeY(clickedSelection);

        }

    })

})
