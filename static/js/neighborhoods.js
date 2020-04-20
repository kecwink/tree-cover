var allData;

//read the data
var n_names = []
//console.log(n_names.sort())
//console.log(namesSorted)
d3.csv('static/data/demographics.csv').then((data) => {
    //console.log(data)
    allData = data;
    

    //console.log(Object.values(allData))
    for (var i = 0; i < allData.length; i++) {
        //console.log(allData[i])
        var names = Object.values(allData[i])
        var name1 = names[1]
        //console.log(names)
        n_names.push(name1)
        
    }
    //console.log(n_names)
    init()
});
//console.log(n_names)
//console.log(allData)
function init() {
    var dropDown = d3.select('#dropDown');
    n_names.forEach(function (names) {
        dropDown.append('option').text(names).property('value', names);
    });

    getPlot(allData[0].Neighborhood)
    //console.log(allData[0].Neighborhood)
}
function getPlot(neighborhood) {

    //select plot area
    var barChart = d3.select('#indDemo');

    //clear the previous information
    barChart.html("")

    //find the sampledata that matches the sample
    var data = allData.filter(obj => obj.Neighborhood == neighborhood)[0]
    //console.log(data)

    //isolate the values
    var demos = Object.values(data)
    //console.log(demos)

    //isolate the wanted demographic values
    var selectedDemos = demos.slice(3, 10)
    //console.log(selectedDemos)

    var neighborhoods = Object.keys(data)
    var selectedNeighborhoods = neighborhoods.slice(3, 10)
    //console.log(selectedNeighborhoods)
    // //isolate the top ten bacteria ids    
    // var graphLabel = []

    // //create an otu label and make each element of the bacteriaId array a string
    // var bacteriaId = data.otu_ids.slice(0, 10)
    // for (var j = 0; j < bacteriaId.length; j++) {
    //     graphLabel.push(`OTU ${bacteriaId[j]}`)
    // };

    //  Create the Traces
    var trace1 = {
        x: selectedNeighborhoods,
        y: selectedDemos,
        type: "bar",
        //orientation: 'h'
        //text: bacteriaId
    };
    // Create the data array for the plot
    var graphData = [trace1];


    //scale the x-axis
    var axisTemplate = {
        //nticks:  4,
        title: "Neighborhood Demographics"
    };
    // Define the plot layout
    var layout = {
        xaxis: axisTemplate
    };

    Plotly.newPlot("indDemo", graphData, layout);
}