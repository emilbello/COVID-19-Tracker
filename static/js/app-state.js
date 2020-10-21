console.log("Loaded app-state.js")

d3.json("/covid_data").then(function (sample) {
    console.log(sample);
});

function init() {

    var current = "/covid_data"
    var select = d3.select("#selDataset");

    // Set up StateID array
    var stateID= []

    // Loops through States to get data
    d3.json(current).then((state) => {
        for (var i = 0; i < state.length; i++) {
           
           // STATE CODE FOR DROPDOWN 
           statecode = state[i].state_abbr;
           stateID.push(statecode);

        }

        // Print in Console to be sure we're getting data
        console.log("States Added to Dropdown: ");
        console.log(stateID);

        // Loop through stateID and append an option to the dropdown
        stateID.forEach((state) => {
            select.append("option").text(state).property("value", state);
        });

        var firstState = stateID[0];
    });
};

init();