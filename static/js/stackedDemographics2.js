
// Define SVG area dimensions
var svgWidth = 900

//var svgWidth = document.getElementById('my_viz').clientWidth;
var svgHeight = 600;


// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 60,
    bottom: 30,
    left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
    .select("#my_viz")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

//var 
// Load data 
d3.csv('static/data/demographics.csv').then(function (demoData) {
    //d3.csv("static/data/demographics.csv").then(function () {
    //demoData = data;
    //console.log(demoData)


    var subgroups = demoData.columns.slice(1)
    console.log(subgroups)
    var barTitles = subgroups.slice(2, 9)
    //console.log(barTitles)

    // Cast the hours value to a number for each piece of tvData
    demoData.forEach(function (data) {
        data.Hispanic = +data.Hispanic
        //console.log(data.Hispanic)
        data.White = +data.White
        data.Black = +data.Black
        data.Native_AM = +data.Native_AM
        data.Asian = +data.Asian
        data.Hawaiian_Pacific = +data.Hawaiian_Pacific
        data.Other = +data.Other

    });
    var neighborhoods = d3.map(demoData, function (d) { return (d.Neighborhood) }).keys()

    // console.log(neighborhoods)
    var xScale0 = d3.scaleBand()
        .domain(neighborhoods)
        .range([0, chartWidth])
        .padding(0.5);

    // scale y to chart height
    // var yScale = d3.scaleLinear()
    //     .domain([0, d3.max(demoData, d => d.Population)])
    //     .range([chartHeight, 0]);



    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(barTitles)
        .range(['purple', 'slategray', 'red', 'blue', 'yellow', 'orange', 'pink',]);

    //stack the data
    var stackedDemo = d3.stack()
        .keys(barTitles)
        (demoData);

    // scale y to chart height
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(stackedDemo[6][77])])
        .range([chartHeight, 0]);



    //console.log(stackedDemo[6][77])
    // console.log(stackedDemo[0])
    // console.log(barTitles[0])
    console.log(stackedDemo[0][0])
    var firstArray = stackedDemo[0][0]
    var yElement = firstArray[1]
    console.log(yElement)

    //create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale0);

    var test = yScale(yElement)
    console.log(test)
    console.log(stackedDemo)

    // set x to the bottom of the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // set y to the y axis    
    chartGroup.append("g")
        .call(yAxis);

    function placingRect(d, i) {
        return i * 10;
        
    }

    // Append Data to chartGroup    
    chartGroup
        .selectAll("rect")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedDemo[0])
        .enter()
        .append("rect")
        .attr("fill", function (d) { return color(d.key); })
        .attr("x", placingRect)
        .attr("y", d => yScale(d[1]))
        .attr("width", xScale0.bandwidth())
        .attr("height", d => yScale(d[0]) - yScale(d[1]));
    //.attr("height", function (d) { return d[0][1]});



});
    //1. line 67 change the max y value to that of the stacked data
    // 2. figure out how to loop through each array for the hispanic population and grab the 2nd element and put it into the height attribute
    // 3. figure out how to loop through the stackedDemo arrays to get each race
