console.log("Loaded app.js HELLO HELLO")

d3.json("/covidhistory").then(function (data) {
    console.log(data);
    
})

d3.json("/rollingavg").then(function (data) {
    console.log(data);
})