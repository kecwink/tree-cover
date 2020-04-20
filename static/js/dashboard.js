var allData;

//read the data
var n_names =[]
d3.csv('static/data/tree_data2.csv').then((data)=>{
    //console.log(data)
    allData = data;
    
    //console.log(Object.values(allData))
    for(var i=0; i < allData.length; i++){
        //console.log(allData[i])
        var names = Object.values(allData[i])
        var name1 =names[0]        
        //console.log(names)
        n_names.push(name1)
    }
    //console.log(n_names)
    init()
});
//console.log(n_names)
function init(){
    var dropDown = d3.select('#dropDown');
    n_names.forEach(function(names){        
        dropDown.append('option').text(names).property('value', names);        
    });
}