// //chart = {
//     var svg = d3
//         .select('#my_viz')
//         .append("svg")
//         .attr("viewBox", [0, 0, width, height])
//         .style("overflow", "visible")

//      var chartGroup = svg.append("g")
//       .selectAll("g")
//       .data(series)
//       .enter().append("g")
//         .attr("fill", d => color(d.key))
//       .selectAll("rect")
//       .data(d => d)
//       .join("rect")
//         .attr("x", d => x(d[0]))
//         .attr("y", (d, i) => y(d.data.name))
//         .attr("width", d => x(d[1]) - x(d[0]))
//         .attr("height", y.bandwidth())
//       .append("title")
//         .text(d => `${d.data.name} ${d.key}
//   ${formatPercent(d[1] - d[0])} (${formatValue(d.data[d.key])})`);

//     svg.append("g")
//         .call(xAxis);

//     svg.append("g")
//         .call(yAxis);

//     return svg.node();
//   //}
// Define SVG area dimensions
//var svgWidth = 550
var svgWidth = document.getElementById('my_viz').clientWidth;
var svgHeight = 800;
//var svgHeight = document.getElementById('chartArea').clientHeight;

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

// Select body, append SVG area to it, and set the dimensions
// var svg = d3
//     .select("#my_viz")
//     .append("svg")
//     .attr("height", svgHeight)
//     .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var svg = d3
    .select("#my_viz")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)

var chartGroup = svg
    .append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`)
// .attr("font-size", "24px")
// .text("Demographics of Denver Neighborhoods");

// Load data 
d3.csv("static/data/demographics.csv").then(function (demoData) {
    //console.log(demoData)
    var subgroups = demoData.columns.slice(1)
    //console.log(subgroups)
    var barTitles = subgroups.slice(2, 9)
    //console.log(barTitles)

    // Cast the hours value to a number for each piece of tvData
    demoData.forEach(function (data) {
        data.Population = +data.Population
        //console.log(data.Population)
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

    //console.log(neighborhoods)
    var x = d3.scaleBand()
        .domain(neighborhoods)
        .range([0, chartWidth])
        .padding(0.5);
    //chartGroup.append("g")
    // .attr("transform", "translate(0," + height + ")")
    // .call(d3.axisBottom(x).tickSizeOuter(0));

    // scale y to chart height
    var y = d3.scaleLinear()
        .domain([0, d3.max(demoData, d => d.Population)])
        .range([chartHeight, 0]);
    //     chartGroup.append("g")
    // .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(barTitles)
        .range(['slategray', 'red', 'blue', 'yellow', 'orange', 'pink', 'purple'])

    // //stack the data
    var stackedDemo = d3.stack()
        .keys(barTitles)
        .offset(d3.stackOffsetExpand)
        (demoData)
        .map(d => (d.forEach(v => v.key = d.key), d))

    //console.log(stackedDemo)

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
    // .append('text')
    // .attr("y", height - 250)
    // .attr("x", width - 100)
    // .attr("text-anchor", "end")
    // .attr("stroke", "black")
    // .text("Year");

    // set y to the y axis    
    chartGroup.append("g")
        .call(yAxis);

    
    //Append Data to chartGroup
    chartGroup.selectAll(".bar")
        .data(demoData)
        .enter()
        .append("rect")
        .attr("fill", function (d) { return color(d.key); })
        // .selectAll("rect")
        // .data(function (d) { return d; })
        .attr("x", d => x(d.Neighborhood))
        .attr("y", d => y(d.White))
        .attr("width", x.bandwidth())
        .attr("height", d => chartHeight - y(d.White));
    //     .data(function (d) { return d; })
    //     .attr("x", function (d) { return x(d.data.Neighborhood) })
    //     .attr("y", function (d) { return y(d[1]); })
    //     .attr("height", function (d) { return y(d[0]) - y(d[1]); })
    //     .attr("width", x.bandwidth());

    // chartGroup.selectAll("stackedBars")
    //     .data(data)
    //     .enter()
    //     .append("g")
    //     .attr("fill", function(d) { return color(d.key); })
    //     .selectAll("rect")
    //     .data(function(d) { return d; })
    //     .enter().append("rect")
    // chartGroup.append("g")
    //     .selectAll("g")
    //     // Enter in the stack data = loop key per key = group per group
    //     .data(stackedDemo)
    //     .enter().append("g")
    //     .attr("fill", function (d) { return color(d.key); })
    //     .selectAll("rect")
    //     .data(function (d) { return d; })
    //     .attr("x", function (d) { return x(d.data.) })
    //     .attr("y", function (d) { return y(d[1]); })
    //     .attr("height", function (d) { return y(d[0]) - y(d[1]); })
    //     .attr("width", x.bandwidth())
    //.attr("height", d => chartHeight - yScale(d.trees));
});
// Show the bars
// svg.append("g")
// .selectAll("g")
// // Enter in the stack data = loop key per key = group per group
// .data(stackedData)
// .enter().append("g")
//   .attr("fill", function(d) { return color(d.key); })
//   .selectAll("rect")
//   // enter a second time = loop subgroup per subgroup to add all rectangles
//   .data(function(d) { return d; })
//   .enter().append("rect")
//     .attr("x", function(d) { return x(d.data.group); })
//     .attr("y", function(d) { return y(d[1]); })
//     .attr("height", function(d) { return y(d[0]) - y(d[1]); })
//     .attr("width",x.bandwidth())