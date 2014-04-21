var data = {
    "regions": ["Federal", "Tigray", "Afar", "Amhara", "Oromia", "Gambella", "Addis Ababa", "Dire Dawa", "Harar", "Benishangul-Gumuz", "Somali", "SNNPR "],
    "institutions": [0, 0, 34, 421, 738, 0, 218, 22, 22, 109, 0, 456]
}

draw(data);

function draw(data) {
    var margin = {
            "top": 10,
            "right": 10,
            "bottom": 30,
            "left": 50
        },
        width = 700,
        height = 300;

    var x = d3.scale.ordinal()
        .domain(data.regions.map(function(d) {
            return d.substring(0, 2);}))
        .rangeRoundBands([0, width], 0);


    var y = d3.scale.linear()
        .domain([0, d3.max(data.institutions)])
        .range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");

    var yAxis = d3.svg.axis().scale(y).orient("left");

    var svgContainer = d3.select("#root").append("svg")
        .attr("class", "chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom).append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.right + ")");

    svgContainer.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate( 0," + height + ")")
        .call(xAxis);

    svgContainer.append("g")
        .attr("class", "y axis").call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Institutions");

    svgContainer.selectAll(".bar").data(data.institutions).enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) {
            return i * x.rangeBand();
        })
        .attr("y", function(d) {
            return y(d);
        })
        .attr("width", function(){
            return x.rangeBand();
        })
        .attr("height", function(d) {
            return height -y(d);
        });
}