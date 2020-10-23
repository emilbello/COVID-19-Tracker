d3.json("/covidhistory").then(function (data) {
    console.log("COVID HISTORY - ENTIRE USA");
    console.log(data);
})

d3.json("/covid_data").then(function (data) {
    console.log("COVID TOTALS BY STATE");
    console.log(data);
})

d3.json("/rollingavg").then(function (data) {
    console.log("COVID DATA - ROLLING AVG BY STATE");
    console.log(data);
})
