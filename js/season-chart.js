
// Main function
function draw(data) {
  "use strict";
  var margin = 50,
      width = 950 - margin,
      height = 550 - margin

  // Creating the svg element for the plot
  var svg = d3.select('#season-chart')
              .append('svg')
              .attr('width', width + margin)
              .attr('height', height + margin)

  // Initializing circle elements and binding with data
  var circles = svg.append('g')
                   .attr('id', 'plot')
                   .selectAll('circle')
                   .data(data)
                   .enter()
                   .append('circle');

  // Defining the y-scale
  var yScale = d3.scaleLinear()
                 .domain([20, 0])
                 .range([height, margin]);

  // Defining the x-scale
  var minDate = new Date(2014, 6, 14),
      maxDate = new Date(2016, 5, 15);

  var xScale = d3.scaleTime()
                 .domain([minDate, maxDate])
                 .range([margin, width]);

  // Define the x- and y-axes
  var yAxis = d3.axisLeft()
                .scale(yScale);

  var xAxis = d3.axisBottom()
                .scale(xScale)

  // Applying scales to circles
  circles.attr('cy', function(d) {
              return yScale(d["Table Position"]);
          })
          .attr('cx', function(d) {
              return xScale(d["Date"])
          })
          .attr('r', '3px');

  // Draw the y- and x-axes
  svg.append('g')
     .attr("transform", "translate(" + margin + ", 0)")
     .call(yAxis)

  svg.append('g')
     .attr("class", "x-axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis)
};

function convert_to_date(text) {
  date = d3.timeParse("%d/%m/%y")
  return date(text)
};

// Loads data
d3.csv("data/leicester-season-data.csv", function(d) {
  d["Matchweek"] = +d["Matchweek"];
  d["Table Position"] = +d["Table Position"]
  d["Date"] = convert_to_date(d["Date"])
  return d;
}, draw);
