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
  const {data: {
      list
    }, start, end, dimensions} = params;
  const self = this;
  console.log('plot function called with: ', params);
  const parseTime = d3.timeParse('%Y-%m-%d');

  const [minPrice, maxPrice] = (function calcMinMaxPrice(stockList) {
    let [minPrice, maxPrice] = [Infinity, 0];
    stockList.forEach((stock) => {
      stock
        .data
        .forEach((pricePoint) => {
          minPrice = Math.min(pricePoint[1], minPrice);
          maxPrice = Math.max(pricePoint[1], maxPrice);
        });
    });
    return [
      Math.floor(minPrice * 0.9),
      Math.floor(maxPrice * 1.1),
    ];
  })(list);

  // console.log('xCoord', parseTime, start, end, parseTime(start), parseTime(end), dimensions[0]);
  const xCoord = d3
    .scaleTime()
    .domain([parseTime(start), parseTime(end)])
    .range([0, dimensions[0]]);

  // console.log('yCoord', minPrice, maxPrice, dimensions[1])
  const yCoord = d3
    .scaleLinear()
    .domain([minPrice, maxPrice])
    .range([dimensions[1], 0]);

  const xAxis = d3.axisBottom(xCoord);
  const yAxis = d3.axisLeft(yCoord);

  const drawLine = d3.line()
    .x(function(d) {
      // console.log('x', d, xCoord(d.date));
      return xCoord(d.date);
    })
    .y(function(d) {
      // console.log('y', d, yCoord(d.price));
      return yCoord(d.price);
    });

  list.forEach((stock) => {
    // console.log(stock.data);
    // Format data
    let data = stock.data.map((pricePoint) => {
      return {
        date: parseTime(pricePoint[0]),
        price: pricePoint[1],
      };
    });
    console.log(data);
    self
      .selectAll('.d3-chart')
      .data([data])
      .enter()
      .append('g')
      .classed('.d3-chart', true)
      .append('path')
      .attr('d', drawLine)
      .attr('stroke', 'blue');
  });
}

export default generateChart;
