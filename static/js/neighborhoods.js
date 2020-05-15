var allData;

//read the data
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

    //clear the previous information
    barChart.html("")

    //find the sampledata that matches the sample
    var data = allData.filter(obj => obj.Neighborhood == neighborhood)[0]
    

    //isolate the values
    var demos = Object.values(data)
    

    //isolate the wanted demographic values
    var selectedDemos = demos.slice(3, 10)
    

    var neighborhoods = Object.keys(data)
    var selectedNeighborhoods = neighborhoods.slice(3, 10)
    

    //  Create the Traces
    var trace1 = {
        x: selectedNeighborhoods,
        y: selectedDemos,
        type: "bar",
        
    };
    // Create the data array for the plot
    var graphData = [trace1];


    //scale the x-axis
    var axisTemplate = {        
        title: "Neighborhood Demographics"
    };
    // Define the plot layout
    var layout = {
        xaxis: axisTemplate
    };

    Plotly.newPlot("indDemo", graphData, layout);
}