var allData;


var n_names = []

d3.csv('static/data/demographics.csv').then((data) => {    
    allData = data;    

    for (var i = 0; i < allData.length; i++) {
        var names = Object.values(allData[i])
        var name1 = names[1]        
        n_names.push(name1)
    }
    
    init()   

});


function init() {
    var dropDown = d3.select('#dropDown');
    n_names.forEach(function (names) {
        dropDown.append('option').text(names).property('value', names);
    });

    getPlot(allData[0].Neighborhood) 
    
}


function getPlot(neighborhood) {
    
    var barChart = d3.select('#indDemo');
    
    barChart.html("")
    
    var data = allData.filter(obj => obj.Neighborhood == neighborhood)[0]
    
    var demos = Object.values(data) 

    var selectedDemos = demos.slice(3, 10)   

    var neighborhoods = Object.keys(data)
    
    var selectedNeighborhoods = neighborhoods.slice(3, 10)    

    
    var trace1 = {
        x: selectedNeighborhoods,
        y: selectedDemos,
        type: "bar",
        
    };
    
    
    var graphData = [trace1];

    
    var axisTemplate = {        
        title: "Neighborhood Demographics"

    };
   
    
    var layout = {
        xaxis: axisTemplate
    };

    Plotly.newPlot("indDemo", graphData, layout);
}


function onChange(neighborhood) {
    
    getPlot(neighborhood)
    
}
