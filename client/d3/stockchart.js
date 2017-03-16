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
    top: 15,
    bottom: 30,
    left: 50,
    right: 15
  };
  const width = parseInt(d3.select('.graph-box').style('width'), 10);
  const height = parseInt(d3.select('.graph-box').style('height'), 10);
  // console.log('Dimensions: ', width, height);

  const frame = d3
    .select('#stock-chart')
    .append('svg')
    .attr('id', 'linear-chart')
    .attr('width', width)
    .attr('height', height);

  const chart = frame
    .append('g')
    .classed('stock-graph', true)
    .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

  frame.on('mouseover', (d, i) => {
    $('.tooltip').css('opacity', 1);
  });

  frame.on('mouseout', (d, i) => {
    $('.tooltip').css('opacity', 0);
  });

  plot.call(chart, {
    data: stocks,
    start,
    end,
    dimensions: [
      width - margin.left - margin.right,
      height - margin.top - margin.bottom,
    ]
  });

  window.onmousemove = function(e) {
    const {clientX, clientY} = e;
    $('.tooltip').each((index, node) => {
      node.style.top = (clientY - 50) + 'px';
      node.style.left = (clientX - 110) + 'px';
    });
  };
  return {};

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
    // console.log('plot function called with: ', params);
    const parseTime = d3.timeParse('%Y-%m-%d');

    const [minPrice,
      maxPrice,
      ] = (function calcMinMaxPrice(stockList) {
      let [minPrice,
        maxPrice,
        ] = [Infinity, 0];
      stockList.forEach((stock) => {
        stock
          .data
          .forEach((pricePoint) => {
            minPrice = Math.min(pricePoint[1], minPrice);
            maxPrice = Math.max(pricePoint[1], maxPrice);
          });
      });
      return [
        Math.floor(minPrice - 0.1 * (maxPrice - minPrice)),
        Math.ceil(maxPrice + 0.1 * (maxPrice - minPrice)),
      ];
    })(list);

    // console.log('xCoord', parseTime, start, end, parseTime(start),
    // parseTime(end), dimensions[0]);
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

    // Apply xAxis
    self
      .append('g')
      .attr('transform', 'translate(0,' + dimensions[1] + ')')
      // .attr('color', 'beige')
      .call(xAxis);

    // Apply yAxis
    self.append('g')
    // .attr('transform', 'translate(' + margin.left + ', 0)')
      .call(yAxis);

    const drawLine = d3
      .line()
      .x(function(d) {
        return xCoord(d.date);
      })
      .y(function(d) {
        return yCoord(d.price);
      });

    list.forEach((stock) => {
      // console.log(stock.data); Format data
      let data = stock
        .data
        .map((pricePoint) => {
          return {
            date: parseTime(pricePoint[0]),
            price: pricePoint[1]
          };
        })
        .filter((pricePoint) => {
          return pricePoint.date > parseTime(start) && pricePoint.date < parseTime(end);
        });
      // console.log(data);
      self
        .selectAll('.d3-chart')
        .data([data])
        .enter()
        .append('g')
        .classed('.d3-chart', true)
        .append('path')
        .attr('d', drawLine)
        .attr('stroke', 'black')
        .attr('fill', 'none');
    });
  }
}

export default generateChart;
