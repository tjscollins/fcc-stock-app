import $ from 'jquery';
import * as d3 from 'd3';

/**
 * generateChart -  * generateChart - generate a d3 plot of stock data passed to the function
 *
 * @param  {array} stocks  an array containing a list of stock objects pulled from the server
 * @param  {string} start  a string start date for the graph in the form YYYY-MM-DD
 * @param  {string} end    a string end date for the graph in the form YYYY-MM-DD
 * @return {object}        description
 */
function generateChart(stocks, start, end) {
  const margin = {
    top: 25,
    bottom: 50,
    left: 50,
    right: 25,
  };

  const frame = d3
    .select('#stock-chart')
    .append('svg')
    .attr('id', 'linear-chart')
    .attr('width', 1100)
    .attr('height', 450);

  const chart = frame
    .append('g')
    .classed('stock-graph', true)
    .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

  plot.call(chart, {
    data: stocks,
    start,
    end,
    dimensions: [
      1025, 375,
    ],
  });
  return {};
}

/**
 * plot - creates the actual plot using d3
 *
 * @param  {object} params parameters used in plotting data
 */
function plot(params) {
  const {data, start, end, dimensions} = params;

  const xCoord = d3
    .scaleTime()
    .domain([
      d3.isoParse(start),
      d3.isoParse(end),
    ])
    .range([0, dimensions[0],]);

  const yCoord = d3
    .scaleLinear()
    .domain([
      d3.min(data, (datum) => {
        return datum[1];
      }) - 100,
      d3.max(data, (datum) => {
        return datum[1];
      }) + 100,
    ])
    .range([dimensions[1], 0,]);

  const xAxis = d3.axisBottom(xCoord);
  const yAxis = d3.axisLeft(yCoord);

  const drawLine = d3
    .line()
    // .interpolate('basis')
    .x(function(d) {
      return x_scale(d[0]);
    })
    .y(function(d) {
      return y_scale(d[1]);
    });

  this
    .selectAll('.d3-chart')
    .data(data)
    .enter()
    .append('g')
    .classed('.d3-chart', true)
    .append('path')
    .attr('d', (d) => {
      return drawLine(d);
    })
    .attr('stroke', 'blue');
}

export default generateChart;
