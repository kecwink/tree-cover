var svgWidth = document.getElementById('my_viz').clientWidth;
var svgHeight = 800;


var chartMargin = {
    top: 30,
    right: 60,
    bottom: 120,
    left: 60
};


var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


var svg = d3
    .select("#my_viz")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)

var chartGroup = svg
    .append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`)

 
d3.csv("static/data/demographics.csv").then(function (demoData) {
    
    var subgroups = demoData.columns.slice(1)
    var barTitles = subgroups.slice(2, 9)   

    
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

    
    var x = d3.scaleBand()
        .domain(neighborhoods)
        .range([0, chartWidth])
        .padding(0.5);    

    
    var y = d3.scaleLinear()
        .domain([0, d3.max(demoData, d => d.Population)])
        .range([chartHeight, 0]);
    

    
    var color = d3.scaleOrdinal()
        .domain(barTitles)
        .range(['pink', 'slategray', 'blue', 'yellow', 'orange', 'pink', 'purple'])

    
    var stackedDemo = d3.stack()
        .keys(barTitles)
        .offset(d3.stackOffsetExpand)
        (demoData)
        .map(d => (d.forEach(v => v.key = d.key), d))

    

    
    var yAxis = d3.axisLeft(y);
    var xAxis = d3.axisBottom(x);


    
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    

        
    chartGroup.append("g")
        .call(yAxis);

    
    
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
