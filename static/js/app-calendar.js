async function renderCSV(){

    const data = await (async () => { 
        //const data = d3.csvParse(await FileAttachment("^DJI@2.csv").text(), d3.autoType);
        var data = await new Promise((resolve, reject) => {
            var rowData = [];
            d3.csv("/static/fundata.csv")
                .row((d) => {key: })
                .get((err, rows) => { resolve(rows); });
        }));
        console.log(JSON.parse(JSON.stringify(data)));
        return d3.pairs(data, ({Close: Previous}, {Date, Close}) => {
            return {date: Date, value: (Close - Previous) / Previous, close: Close};
        });
    })();

    // Cell 1
    const max = d3.quantile(data.map(d => Math.abs(d.value)).sort(d3.ascending), 0.9975);

    const color = d3.scaleSequential(d3.interpolatePiYG).domain([-max, +max]);

    // Cell 2
    const formatMonth = d3.utcFormat("%b");


    // Cell 3
    const formatDay = d => "SMTWTFS"[d.getUTCDay()];

    // Cell 4
    const formatDate = d3.utcFormat("%x");

    // Cell 5
    const formatClose = d3.format("$,.2f");

    // Cell 6
    const formatValue = d3.format("+.2%");

    // Cell 7 
    function pathMonth(t) {
        const n = weekday === "weekday" ? 5 : 7;
        const d = Math.max(0, Math.min(n, countDay(t)));
        const w = timeWeek.count(d3.utcYear(t), t);
        return `${d === 0 ? `M${w * cellSize},0`
            : d === n ? `M${(w + 1) * cellSize},0`
            : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`}V${n * cellSize}`;
    }

    // Cell 8 
    const countDay = weekday === "sunday" ? d => d.getUTCDay() : d => (d.getUTCDay() + 6) % 7;

    // Cell 9
    const timeWeek = weekday === "sunday" ? d3.utcSunday : d3.utcMonday;

    // Cell 10
    const height = cellSize * (weekday === "weekday" ? 7 : 9);

    // Cell 11 & 12
    const width = 954;
    const cellSize = 17;


    // Read in CSV

    // Cell 13
    const years = d3.groups(data, d => d.date.getUTCFullYear()).reverse();

    // Cell 14

    const svg = d3.select("#calendar")
        .attr("viewBox", [0, 0, width, height * years.length])
        .attr("font-family", "sans-serif")
        .attr("font-size", 10);

    const year = svg.selectAll("g")
        .data(years)
        .join("g")
        .attr("transform", (d, i) => `translate(40.5,${height * i + cellSize * 1.5})`);

    year.append("text")
        .attr("x", -5)
        .attr("y", -5)
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(([key]) => key);

    year.append("g")
        .attr("text-anchor", "end")
        .selectAll("text")
        .data((weekday === "weekday" ? d3.range(2, 7) : d3.range(7)).map(i => new Date(1995, 0, i)))
        .join("text")
        .attr("x", -5)
        .attr("y", d => (countDay(d) + 0.5) * cellSize)
        .attr("dy", "0.31em")
        .text(formatDay);

    year.append("g")
        .selectAll("rect")
        .data(weekday === "weekday" 
            ? ([, values]) => values.filter(d => ![0, 6].includes(d.date.getUTCDay()))
            : ([, values]) => values)
        .join("rect")
        .attr("width", cellSize - 1)
        .attr("height", cellSize - 1)
        .attr("x", d => timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 0.5)
        .attr("y", d => countDay(d.date) * cellSize + 0.5)
        .attr("fill", d => color(d.value))
        .append("title")
        .text(d => `${formatDate(d.date)}
    ${formatValue(d.value)}${d.close === undefined ? "" : `
    ${formatClose(d.close)}`}`);

    const month = year.append("g")
        .selectAll("g")
        .data(([, values]) => d3.utcMonths(d3.utcMonth(values[0].date), values[values.length - 1].date))
        .join("g");

    month.filter((d, i) => i).append("path")
        .attr("fill", "none")
        .attr("stroke", "#fff")
        .attr("stroke-width", 3)
        .attr("d", pathMonth);

    month.append("text")
        .attr("x", d => timeWeek.count(d3.utcYear(d), timeWeek.ceil(d)) * cellSize + 2)
        .attr("y", -5)
        .text(formatMonth);

    return svg.node();
}


renderCSV()
