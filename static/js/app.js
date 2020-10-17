console.log("Loaded app.js")

d3.json("/").then(function (data) {
    console.log(data);
})