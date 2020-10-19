console.log("Loaded app.js HELLO HELLO")

d3.json("/covidhistory").then(function (data) {
    console.log(data);

        // Next, pull out the keys and the values for graphing
        keys = data.map(x => x.date)
        values = data.map(x => x.value)
    
        // Create the trace
        var trace = {
            x: keys,
            y: values,
            type: "bar"
        };
    
        // Put the trace into an array (which allows us to graph
        // multiple traces, if we wish)
        var data = [trace];
    
        // Define a layout object
        var layout = {
            title: "'Bar' Chart",
            xaxis: { title: "Date"},
            yaxis: { title: "Death"}
        };
    
        // Create the plot
        Plotly.newPlot("plot", data, layout); 
})

d3.json("/rollingavg").then(function (data) {
    console.log(data);
})