function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("#chart").select("svg");

    // clear svg is not empty
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    
    var svgWidth = document.getElementById('chart').clientWidth;
    var svgHeight = 800;
    

    var margin = {
        top: 20,
        right: 40,
        bottom: 60,
        left: 60
    };
    
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    // Append SVG element
    var svg = d3
        .select("#chart")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // Append group element
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


    // read the csv file 
    d3.csv('static/data/tree_data.csv').then(function (treeData) {     

        
        treeData.forEach(function (data) {
            data.perRented = +data.perRented;
            data.trees = +data.trees;           
            
        });

        //console.log(treeData)
        //create scales
        var xLinearScale = d3.scaleLinear()
            .domain([d3.min(treeData, d => d.trees), d3.max(treeData, d => d.trees)])     
            .range([0, width]);
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(treeData, d => d.perRented)])
            .range([height, 0]);

        //create axes
        var xAxis = d3.axisBottom().scale(xLinearScale)
        var yAxis = d3.axisLeft().scale(yLinearScale)

        //append axes
        chartGroup.append('g')
            .attr("transform", `translate(0, ${height})`)
            .attr("class", "chart")
            .call(xAxis);

        chartGroup.append('g')
            .call(yAxis)
            .attr("class", "chart");

        //circle generator
        var circlesGroup = chartGroup.selectAll("circle")
            .data(treeData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.trees))
            .attr("cy", d => yLinearScale(d.perRented))
            .attr("r", "20")
            .attr("class", "neighborhood")
            .attr("stroke", "blue");
       

          //  Initialize Tooltip
          var toolTip = d3.tip()
            
            .attr("class", "d3.tip")
            
            .html(function (d) {
                return (`<strong>Neighborhood: ${d.neighborhood}<hr>Quantity of trees: ${d.trees}<hr> % of Units Rented: ${d.perRented}</strong>`);
            });

          // Create the tooltip in chartGroup.
          chartGroup.call(toolTip);

          // Create "mouseover" event listener to display tooltip
          circlesGroup.on("mouseover", function(d) {
            toolTip.show(d, this);
          })
            // Create "mouseout" event listener to hide tooltip
            .on("mouseout", function(d) {
              toolTip.hide(d);
            });
        // Create axes labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 10)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("% of Units Rented in a Neighborhood");

        chartGroup.append("text")            
            .attr("y", 0 - margin.bottom - 10)
            .attr("x", 0 + margin.right - 60)
            .attr("class", "axisText")
            .text("Number of Trees");
     })
    

}
// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);








