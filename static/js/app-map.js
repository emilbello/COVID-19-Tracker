var myMap = L.map('map').setView([41, -111], 4);
// best with box 1200 x 750 px, placed in style.css

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);

var link = "../static/js/us-states.geojson";

function chooseColor(d) {
    if (d > 1000) { return "#be64ac"; }
    else { return "#8c62aa"; }
};

// colors: [
//     "#e8e8e8", "#ace4e4", "#5ac8c8",
//     "#dfb0d6", "#a5add3", "#5698b9", 
//     "#be64ac", "#8c62aa", "#3b4994"
//   ]

// function chooseFill(state) {
//     d3.json("covid_data").then(function (data) 
//     {
//         for i in length(data)
//         if data[]
//     })
//     if state 

// };

// chooseFill("Alabama");



// d3.json("/covid_data").then(function (data) {

//     for (x in data) {
//         var statename = data[x].state;
//         var deathrate = data[x].death_per_100k;
//         var positrate = data[x].positive_per_100k;
//         if (deathrate < 33) {
//             color = "orange";
//         }
//         else if (deathrate < 66) {
//             color = "yellow";
//         }
//         else {
//             color = "red";
//         }
//         console.log(statename);
//         console.log(color);
//     };
// });



// function stateFill(state) {

//     console.log(state);
//     // console.log(data);
//     // for (x in data) {
//     for (var x = 0; x < data.length; x++) {
//         if (data[x].state === state) {
//             var statename = data[x].state;
//             var deathrate = data[x].death_per_100k;
//             var positrate = data[x].positive_per_100k; }
//         }
//     console.log(statename);
//     console.log(deathrate);
//     console.log(positrate);

//     if (deathrate < 33) {
//         color = "gold";
//     }
//     else if (deathrate < 66) {
//         color = "orange";
//     }
//     else {
//         color = "red";
//         }

//     console.log(color);

//     return color;

// };

// console.log("Test here");
// stateFill("Minnesota");


async function initMap() {
    const globalDataPromise = d3.json("/covid_data");
    const geojsonPromise = d3.json(link);

    const globalData = await globalDataPromise;
    console.log(globalData);

    function chooseFill(state) {
        var color = "black";
        for (var x = 0; x < globalData.length; x++) {
            if (globalData[x].state === state) {
                var statename = globalData[x].state;
                var deathrate = globalData[x].death_per_100k;
                var positrate = globalData[x].positive_per_100k;
            }
        }
        console.log(statename);
        console.log(deathrate);
        console.log(positrate);

        // Low deathrate: low, medium, high positive rates
        if (deathrate < 33) {
            if (positrate < 2000) {
                color = "#FAE5D3";
            }
            else if (positrate < 3000) {
                color = "#F8C471";
            }
            else {
                color = "#F1C40F";
            }
        }
        // Med deathrate: low, medium, high positive rates
        else if (deathrate < 66) {
            if (positrate < 2000) {
                color = "#E59866";
            }
            else if (positrate < 3000) {
                color = "#E67E22";
            }
            else {
                color = "#B9770E";
            }
        }
        // High deathrate: low, medium, high positive rates
        else {
            if (positrate < 2000) {
                color = "#C0392B";
            }
            else if (positrate < 3000) {
                color = "#A04000";
            }
            else {
                color = "#784212";
            }
        }

        console.log(color);

        return color;
    }

    function pullDeaths(state) {
        var deathrate = 0;
    
        for (var x = 0; x < globalData.length; x++) {
            if (globalData[x].state === state) {
                var deathrate = globalData[x].death_per_100k;
            }
        }
        return deathrate;
    }

    function pullPosits(state) {
        var positrate = 0;
    
        for (var x = 0; x < globalData.length; x++) {
            if (globalData[x].state === state) {
                var positrate = globalData[x].positive_per_100k;
            }
        }
        return positrate;
    }

    function pullQual(state) {
        var quality = "";
    
        for (var x = 0; x < globalData.length; x++) {
            if (globalData[x].state === state) {
                var quality = globalData[x].data_quality_grade;
            }
        }
        if (quality === "#REF!") { quality = "F"; }
        else { quality = quality; }

        return quality;
    }


    const data = await geojsonPromise;

    L.geoJson(data, {
        style: function (feature) {
            // console.log(chooseFill(feature.properties.name));
            return {
                color: "white",
                // fillColor: chooseColor(parseInt(feature.properties.density)),
                fillColor: chooseFill(feature.properties.name),
                // fillColor: "red",
                fillOpacity: 1,
                weight: 0.75
            };
        },
        onEachFeature: function (feature, layer) {
            layer.on({
                mouseover: function (event) {
                    layer = event.target;
                    layer.setStyle({
                        color: "white",
                        weight: 3,
                    });
                },

                mouseout: function (event) {
                    layer = event.target;
                    layer.setStyle({
                        color: "white",
                        weight: 0.75
                    });
                },

                // click: function(event) {
                //         myMap.setView([41, -111], 4)
                // //     myMap.fitBounds(event.target.getBounds());
                // }
            });
            layer.bindPopup("<h5>" + feature.properties.name + "</h5><hr><h6>Deaths per 100k: " + pullDeaths(feature.properties.name) + "<br>Positives per 100k: "+ pullPosits(feature.properties.name) + "<br>Data Quality Grade: " + pullQual(feature.properties.name) + "</h6>")
        }

    }).addTo(myMap);


}

initMap();

// var gloobalData;

// async function chooseFill(state) {

//     var color = "blue"

//     console.log(globalData);

//     for (var x = 0; x < globalData.length; x++) {
//         if (globalData[x].state === state) {
//             var statename = globalData[x].state;
//             var deathrate = globalData[x].death_per_100k;
//             var positrate = globalData[x].positive_per_100k;
//         }
//     }

//     console.log(statename);
//     console.log(deathrate);
//     console.log(positrate);

//     if (deathrate < 33) {
//         color = "gold";
//     }
//     else if (deathrate < 66) {
//         color = "orange";
//     }
//     else {
//         color = "red";
//     }

//     console.log(color);

//     return color;
// };

// console.log("TESTING");
// var testColor = chooseFill("Minnesota");
// console.log(testColor);




// // d3.json("/covid_data").then(function (data) {

// //     console.log(state);
// //     // console.log(data);
// //     // for (x in data) {
// //     for (var x = 0; x < data.length; x++) {
// //         if (data[x].state === state) {
// //             var statename = data[x].state;
// //             var deathrate = data[x].death_per_100k;
// //             var positrate = data[x].positive_per_100k; }
// //         }
// //     console.log(statename);
// //     console.log(deathrate);
// //     console.log(positrate);

// //     if (deathrate < 33) {
// //         color = "gold";
// //     }
// //     else if (deathrate < 66) {
// //         color = "orange";
// //     }
// //     else {
// //         color = "red";
// //         }

// //     console.log(color);
// // });
// // var returnColor = color;
// // return returnColor;
// // };









// // console.log("Start function");
// // chooseFill("Minnesota");
// // console.log("End function");

// // code for two variables to determine fill
// // if (deathrate < 33) {
// //     if (positrate < 2000) {
// //         return "blue";
// //     }
// //     else if (positrate < 3000) {
// //         return "green";
// //     }
// //     else
// //         return "yellow";
// // }
// // else if (deathrate < 66) {
// //     if (positrate < 2000) {
// //         return "purple";
// //     }
// //     else if (positrate < 3000) {
// //         return "red";
// //     }
// //     else
// //         return "orange";
// // }
// // else {
// //     if (positrate < 2000) {
// //         return "silver";
// //     }
// //     else if (positrate < 3000) {
// //         return "gray";
// //     }
// //     else
// //         return "black";
// // }



// // chooseFill("Alabama");

// // function createFeatures(statesData)


// d3.json(link).then(function (data) {
//     L.geoJson(data, {
//         style: function (feature) {
//             // console.log(chooseFill(feature.properties.name));
//             return {
//                 color: "white",
//                 // fillColor: chooseColor(parseInt(feature.properties.density)),
//                 fillColor: chooseFill(feature.properties.name),
//                 // fillColor: "red",
//                 fillOpacity: 1,
//                 weight: 0.75
//             };
//         },
//         onEachFeature: function (feature, layer) {
//             layer.on({
//                 mouseover: function (event) {
//                     layer = event.target;
//                     layer.setStyle({
//                         color: "white",
//                         weight: 3,
//                     });
//                 },

//                 mouseout: function (event) {
//                     layer = event.target;
//                     layer.setStyle({
//                         color: "white",
//                         weight: 0.75
//                     });
//                 },

//                 // click: function(event) {
//                 //     myMap.fitBounds(event.target.getBounds());
//                 // }
//             });
//             layer.bindPopup("<h5>" + feature.properties.name + "</h5><hr><h6>" + feature.properties.density + "</h6>");
//         }

//     }).addTo(myMap);
// });

// // try top left (below alaska) or top right (above maine)
// var legend = L.control({position: "topright"});

//     legend.onAdd = function(map) {
//         var div = L.DomUtil.create("div", "info legend"),
//         grades = [],
//         labels = []

//         div.innerHTML += "<table>\
//         <tr><td></td><th colspan = 4>Infection Rate</th>\
//         </tr>\
//         <tr><th class='rotate' rowspan = '4'>Death Rate</th>\
//             <td></td><td>Low</td><td>Med</td><td>High</td>\
//         </tr>\
//         <tr><td class='rotate'>High</td>\
//         </tr>\
//         <tr><td class='rotate'>Med</td>\
//         </tr>\
//         <tr><td class='rotate'>Low</td>\
//         </tr>\
//             "
//             return div;
//     };

// legend.addTo(myMap);

