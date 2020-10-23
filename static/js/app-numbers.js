console.log("Loaded app-numbers.js")

d3.json("/covidhistory").then(function (data) {
   
    // console.log(data); // Test to see if data is received
    // Get Today's Date and format --- https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date(data[0].date);
    var todays_date = today.toLocaleDateString("en-US", options);

    // Format numbers to have commas
    var death_comma = (data[0].all_death).toLocaleString('en');
    var pos_comma = (data[0].total_pos).toLocaleString('en');
    var hosp_comma = (data[0].hospitalized_current).toLocaleString('en');
    

    var death_today = d3.select("#death_today")
        .append("h6")
        .classed('thin-text', true)
        .html(death_comma);
    var today = d3.select("#today")
        .append("h6")
        .classed('thin-text', true)
        .html(todays_date);
    var pos_today = d3.select("#positive_today")
        .append("h6")
        .classed('thin-text', true)
        .html(pos_comma)
    var neg_today = d3.select("#negative_today")
        .append("h6")
        .html(data[0].total_neg)
    var vent_today = d3.select("#vent_today")
        .append("h6")
        .html(data[0].on_ventilator_currently)
    var hosp_today = d3.select("#hosp_today")
        .append("h6")
        .classed('thin-text', true)
        .html(hosp_comma)
})