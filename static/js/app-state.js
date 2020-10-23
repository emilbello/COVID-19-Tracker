console.log("Loaded app-state.js")
// Check to see if we have data ------------------
// d3.json("/covid_data").then(function (sample) {
//     console.log(sample);
// });
// EVENT HANDLER - install handler to grab dataset values
d3.selectAll("body").on("change", updateAll);
function updateAll() {
    var dropdownMenu = d3.select("#selDataset");
    var dropdownMenu2 = d3.select("#selDataset2");
    var dataset = dropdownMenu.node().value;
    var dataset2 = dropdownMenu2.node().value;
    console.log("States Selected:")
    console.log(dataset); // Will run when new dropdown item is selected
    console.log(dataset2) // Will run when new dropdown 2 item is selected
    
    linePlots(dataset, dataset2);
    
};
function linePlots(info, info2){
    console.log("buildPlots FUNCTION RUNNING");
    console.log("Dropdown 1:")
    console.log(info);
    console.log("Dropdown 2:")
    console.log(info2);
    d3.json("/rollingavg").then((meta) => {
        console.log(`buildPlots on ${info} and ${info2}`);
        // Grab selected Dataset from samples using state ID from dropdown
        var selectedData = meta.filter(x => x.state === info);
        console.log(selectedData);
        var selectedData2 = meta.filter(x => x.state === info2);
        console.log(selectedData2);
        
        // x axis:
        var datesAxis = selectedData.map(date => date.date);
        var datesAxis2 = selectedData2.map(date => date.date);
        var ncountAxis = selectedData.map(c => c.new_datelapse);
        var ncountAxis2 = selectedData2.map(c => c.new_datelapse);
        var dcountAxis = selectedData.map(c => c.death_datelapse);
        var dcountAxis2 = selectedData.map(c => c.death_datelapse);
        //y axis
        var rolVal = selectedData.map(rol => rol.positive_rolling_avg);
        var rolVal2 = selectedData2.map(rol => rol.positive_rolling_avg);
        var nVal = selectedData.map(rol => rol.positive);
        var nVal2 = selectedData2.map(rol => rol.positive);
        var dVal = selectedData.map(rol => rol.death);
        var dVal2 = selectedData2.map(rol => rol.death);
        var dRolVal = selectedData.map(rol => rol.death_rolling_avg);
        var dRolVal2 = selectedData2.map(rol => rol.death_rolling_avg);
        // tooltip text
        var ntoolTip = selectedData.map(tt => tt.positive_increase);
        var ntoolTip2 = selectedData2.map(tt => tt.positive_increase);
        var dtoolTip = selectedData.map(tt => tt.death_increase);
        var dtoolTip2 = selectedData2.map(tt => tt.death_increase);

        // Plots
        var trace1 = {
            x: datesAxis,
            y: nVal,
            mode: 'line',
            text: ntoolTip,
            name: info,
            line: {
                color: '#DE6E04',
                weight: 3
            }
        };
        var trace2 = {
            x: datesAxis,
            y: nVal2,
            mode: 'lines',
            text: ntoolTip2,
            name: info2,
            line: {
                color: '#EBAA07',
                weight: 3
            }
        };
        var data = [ trace1, trace2 ];

        var layout = {
            title:`${info} vs. ${info2} cumulative new cases`
          };

        Plotly.newPlot('plotly', data, layout);

        var p2trace1 = {
            x: datesAxis,
            y: dVal,
            mode: 'line',
            text: dtoolTip,
            name: info,
            line: {
                color: '#E40701',
                weight: 3
            }
        };
        var p2trace2 = {
            x: datesAxis,
            y: dVal2,
            mode: 'lines',
            text: dtoolTip2,
            name: info2,
            line: {
                color: '#F0560C',
                weight: 3
            }
        };
        var p2data = [ p2trace1, p2trace2 ];

        var p2layout = {
            title:`${info} vs. ${info2} cumulative deaths`
          };

        Plotly.newPlot('plotly2', p2data, p2layout);

        var p3trace1 = {
            x: ncountAxis,
            y: rolVal,
            text: datesAxis,
            mode: 'line',
            name: info,
            line: {
                color: '#DE6E04',
                weight: 3
            }
        };
        var p3trace2 = {
            x: ncountAxis2,
            y: rolVal2,
            text: datesAxis2,
            mode: 'lines',
            name: info2,
            line: {
                color: '#EBAA07',
                weight: 3
            }
        };
        var p3data = [ p3trace1, p3trace2 ];

        var p3layout = {
            title:`${info} vs. ${info2} 7 days rolling average of new cases since 10 cases first recorded`,
            xaxis: {
                title: 'Number of days since 10 cases-day first recorded',
                tick0: 0
            },
            yaxis: {
                tick0: 0,
                type: 'log',
                //autorange: true
            }
            
          };

        Plotly.newPlot('plotly3', p3data, p3layout);

        var p4trace1 = {
            x: dcountAxis,
            y: dRolVal,
            text: datesAxis,
            mode: 'line',
            name: info,
            line: {
                color: '#E40701',
                weight: 3
            }
        };
        var p4trace2 = {
            x: dcountAxis2,
            y: dRolVal2,
            text: datesAxis2,
            mode: 'lines',
            name: info2,
            line: {
                color: '#F0560C',
                weight: 3
            }
        };
        var p4data = [ p4trace1, p4trace2 ];

        var p4layout = {
            title:`${info} vs. ${info2} 7 days rolling average of deaths since 10 cumulative deaths recorded`,
            xaxis: {
                title: 'Number of days since 10 cumulative deaths recorded',
                tick0: 0
            },
            yaxis: {
                tick0: 0,
                type: 'log',
                //autorange: true
            }
            
          };

        Plotly.newPlot('plotly4', p4data, p4layout);
        // ---- BUBBLE CHART ----
        // Grab variables for Bubble Chart
        // var sample_values = selectedData[0].sample_values;
        // var otu_ids = selectedData[0].otu_ids;
        // var otu_labels = selectedData[0].otu_labels
        // console.log(otu_labels); // TEST
        // ----- BAR CHART -----
        // Organize by top 10 OTUs found in individual
        // console.log(topTenOtuIDs);
     
        // var bar1 = {
        //     x: selectedData[0].sample_values.slice(0,10).reverse(),
        //     y: selectedData[0].otu_ids.slice(0,10).map(otu_id => `OTU ${otu_id}`).reverse(),
        //     text: selectedData[0].otu_labels.slice(0,10).reverse(),
        //     // name: "Sample",
        //     type: "bar",
        //     orientation: "h",
        //     marker: {
        //         color: "#FFA85C"
        //     }
        // };
        // var barData = [bar1];
        // var barLayout = {
        //     title: "Top 10 OTUs Found in Sample",
        //     margin: {
        //         l: 100,
        //         r: 100,
        //         t: 100,
        //         b: 100
        //       }
        // };
        // Plotly.newPlot("bar", barData, barLayout);
    })
    
};
function init() {
    var current = "/covid_data"
    
    // Set up StateID array
    var stateID= []
    var stateID2 = []
    var select = d3.select("#selDataset");
    var select2 = d3.select("#selDataset2");
    // Loops through States to get data
    d3.json(current).then((state) => {
        for (var i = 0; i < state.length; i++) {
           
           // STATE CODE FOR DROPDOWN 
           statecode = state[i].state_abbr;
           stateID.push(statecode);
           stateID2.push(statecode)
        }
        // Print in Console to be sure we're getting data
        // console.log("States Added to Dropdown #1 & #2: ");
        // console.log(stateID);
        // Loop through stateID and append an option to the dropdown
        stateID.forEach((state) => {
            select.append("option").text(state).property("value", state);
        });
        stateID2.forEach((state) => {
            select2.append("option").text(state).property("value", state);
        });
        // var firstState = stateID;
        // var firstState2 = stateID2;
        // console.log(firstState2);
        
        updateAll();
    });
};
init();