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
                color = "#e7c2e3";
            }
            else if (positrate < 3000) {
                color = "#837fd8";
            }
            else {
                color = "#1e48a7";
            }
        }
        // Med deathrate: low, medium, high positive rates
        else if (deathrate < 66) {
            if (positrate < 2000) {
                color = "#d08bc7";
            }
            else if (positrate < 3000) {
                color = "#8f4daa";
            }
            else {
                color = "#36328c";
            }
        }
        // High deathrate: low, medium, high positive rates
        else {
            if (positrate < 2000) {
                color = "#d31654";
            }
            else if (positrate < 3000) {
                color = "#c03daf";
            }
            else {
                color = "#78126b";
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
            
            return {
                color: "white",
                fillColor: chooseFill(feature.properties.name),
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

            });
            layer.bindPopup("<h5>" + feature.properties.name + "</h5><hr><h6>Deaths per 100k: " + pullDeaths(feature.properties.name) + "<br>Positives per 100k: "+ pullPosits(feature.properties.name) + "<br>Data Quality Grade: " + pullQual(feature.properties.name) + "</h6>")
        }

    }).addTo(myMap);


}


initMap();

var legend = L.control({position: "topleft"});
    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "info legend"),
        grades = [],
        labels = []
        div.innerHTML += '<img src="/static/images/choropleth-legend.png" width="120" height="150">'
        return div;
    };
legend.addTo(myMap);



