var svgWidth = document.getElementById('my_viz').clientWidth;
var svgHeight = 800;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 60,
    bottom: 120,
    left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;



// Append a group to the SVG area
var svg = d3
    .select("#my_viz")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)

var chartGroup = svg
    .append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`)

// Load data 
d3.csv("static/data/demographics.csv").then(function (demoData) {
    
    var subgroups = demoData.columns.slice(1)
    var barTitles = subgroups.slice(2, 9)
    

    // Cast the hours value to a number for each piece of tvData
    demoData.forEach(function (data) {
        data.Population = +data.Population        
        data.Hispanic = +data.Hispanic        
        data.White = +data.White
        data.Black = +data.Black
        data.Native_AM = +data.Native_AM
        data.Asian = +data.Asian
        data.Hawaiian_Pacific = +data.Hawaiian_Pacific
        data.Other = +data.Other

    });
    var neighborhoods = d3.map(demoData, function (d) { return (d.Neighborhood) }).keys()

    //scale x to chart width
    var x = d3.scaleBand()
        .domain(neighborhoods)
        .range([0, chartWidth])
        .padding(0.5);
    

    // scale y to chart height
    var y = d3.scaleLinear()
        .domain([0, d3.max(demoData, d => d.Population)])
        .range([chartHeight, 0]);
    

    // color palette for each demographics
    var color = d3.scaleOrdinal()
        .domain(barTitles)
        .range(['pink', 'slategray', 'blue', 'yellow', 'orange', 'pink', 'purple'])

    // //stack the data
    var stackedDemo = d3.stack()
        .keys(barTitles)
        .offset(d3.stackOffsetExpand)
        (demoData)
        .map(d => (d.forEach(v => v.key = d.key), d))

    

    //create axes
    var yAxis = d3.axisLeft(y);
    var xAxis = d3.axisBottom(x);


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

    
    //Append Data to chartGroup
    chartGroup.selectAll(".bar")
        .data(demoData)
        .enter()
        .append("rect")
        .attr("fill", function (d) { return color(d.key); })        
        .attr("x", d => x(d.Neighborhood))
        .attr("y", d => y(d.White))
        .attr("width", x.bandwidth())
        .attr("height", d => chartHeight - y(d.White));    
});
