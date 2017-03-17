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

  plot.call(chart, {
    data: stocks,
    start,
    end,
    dimensions: [
      width - margin.left - margin.right,
      height - margin.top - margin.bottom
    ]
  });

  window.onmousemove = function(e) {
    const {clientX, clientY} = e;
    $('.tooltip').each((index, node) => {
      node.style.top = (clientY - 50) + 'px';
      node.style.left = (clientX - 125) + 'px';
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
    const parseTime = d3.timeParse('%Y-%m-%d');
    const bisectDate = d3.bisector((d) => {
      return d.date;
    })
      .left;

    const [minPrice,
      maxPrice] = (function calcMinMaxPrice(stockList) {
      let [minPrice,
        maxPrice] = [Infinity, 0];
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
        Math.ceil(maxPrice + 0.1 * (maxPrice - minPrice))
      ];
    })(list);

    const xCoord = d3
      .scaleTime()
      .domain([parseTime(start), parseTime(end)])
      .range([0, dimensions[0]]);

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
      .attr('class', 'axis')
      .call(xAxis);

    // Apply yAxis
    self
      .append('g')
      .attr('class', 'axis')
      .call(yAxis);

    const drawLine = d3
      .line()
      .x(function(d) {
        return xCoord(d.date);
      })
      .y(function(d) {
        return yCoord(d.price);
      });

    let markers = [];
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

      self
        .selectAll('.d3-chart')
        .data([data])
        .enter()
        .append('g')
        .append('path')
        .classed('d3-chart-line', true)
        .attr('d', drawLine)
        .attr('stroke', 'white')
        .attr('fill', 'none');

      let marker = self
        .append('g')
        .attr('class', 'marker')
        .append('circle')
        .attr('stroke', 'steelblue')
        .attr('fill', 'steelblue')
        .attr('r', 4.5);
      let markerLine = self
        .append('g')
        .append('line')
        .attr('id', `line-${stock.sym}`)
        .classed('intercept-line', true);

      markers.push([marker, markerLine]);
    });
    // Mouseover and movement effects
    frame.on('mouseover', (d, i) => {
      $('.tooltip').css('opacity', 1);
    }).on('mouseout', (d, i) => {
      $('.tooltip').css('opacity', 0);
    }).on('mousemove', () => {
      let x0 = xCoord.invert(d3.event.offsetX - margin.left);
      // let mouseDate;
      let tooltipTitle;
      let toolTipData = '';

      list.forEach((stock, s) => {
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
        let i = bisectDate(data, x0, 1);
        let d0 = data[i - 1];
        let d1 = data[i];
        let d = x0.valueOf() - d0
          .date
          .valueOf() > d1
          .date
          .valueOf() - x0.valueOf()
          ? d1
          : d0;
        tooltipTitle = `<h1>${d.date.toDateString()}</h1>`;
        toolTipData += `<div><p style="margin-left: 10px; margin-right: 20px">${stock.sym.toUpperCase()}</p> <p style="margin-right: 10px">${Math.round(d.price)}</p></div>`;
        markers[s][0].attr('transform', 'translate(' + (xCoord(d.date)) + ',' + (yCoord(d.price)) + ')');
        // markers[s][1]
        //   .select('line.intercept-line')
        //   .attr('x1', xCoord(d.date))
        //   .attr('x2', xCoord(d.date))
        //   .attr('y1', 0)
        //   .attr('y2', height)
        //   .attr('stroke', 'red')
        //   .attr('stroke-width', '5px');
      });
      $('.tooltip').html(tooltipTitle + toolTipData);
    });
  }
}

export default generateChart;
