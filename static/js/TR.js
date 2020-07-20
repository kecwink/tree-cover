   
    var svgArea = d3.select("#chart").select("svg");

    
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

    
    var svg = d3
        .select("#chart")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


     
    d3.csv('static/data/tree_data.csv').then(function (treeData) {    

        
        treeData.forEach(function (data) {
            data.perRented = +data.perRented;
            data.trees = +data.trees;           
            
        });

        
        
        var xLinearScale = d3.scaleLinear()
            .domain([d3.min(treeData, d => d.trees), d3.max(treeData, d => d.trees)])     
            .range([0, width]);
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(treeData, d => d.perRented)])
            .range([height, 0]);

        
        var xAxis = d3.axisBottom().scale(xLinearScale)
        var yAxis = d3.axisLeft().scale(yLinearScale)

        
        chartGroup.append('g')
            .attr("transform", `translate(0, ${height})`)
            .attr("class", "chart")
            .call(xAxis);

        chartGroup.append('g')
            .call(yAxis)
            .attr("class", "chart");

        
        var circlesGroup = chartGroup.selectAll("circle")
            .data(treeData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.trees))
            .attr("cy", d => yLinearScale(d.perRented))
            .attr("r", "20")
            .attr("class", "neighborhood")
            .attr("stroke", "blue");
       

          
          var toolTip = d3.tip()
            
            .attr("class", "d3.tip")
            
            .html(function (d) {
                return (`<strong>Neighborhood: ${d.neighborhood}<hr>Quantity of trees: ${d.trees}<hr> % of Units Rented: ${d.perRented}</strong>`);
            });

          
          chartGroup.call(toolTip);

          
          circlesGroup.on("mouseover", function(d) {
            toolTip.show(d, this);
          })
            
            .on("mouseout", function(d) {
              toolTip.hide(d);
            });
        
        
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
    








