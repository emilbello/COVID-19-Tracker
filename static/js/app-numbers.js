console.log("Loaded app-numbers.js")

d3.json("/covidhistory").then(function (data) {
    console.log("US TOTAL NUMBERS");
    console.log(data);

    var death_today = d3.select("#death_today")
        .append("h1")
        .html(data[0].all_death);
    var today = d3.select("#today")
        .append("h6")
        .html(data[0].date);
    var pos_today = d3.select("#positive_today")
        .append("h1")
        .html(data[0].total_pos)
    var neg_today = d3.select("#negative_today")
        .append("h1")
        .html(data[0].total_neg)
    var vent_today = d3.select("#vent_today")
        .append("h1")
        .html(data[0].on_ventilator_currently)
    var hosp_today = d3.select("#hosp_today")
        .append("h1")
        .html(data[0].hospitalized_current)
})

d3.json("/covid_data").then(function (data){
    console.log(data);
})