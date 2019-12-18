import React, { Component } from 'react'
import '../App.css'
import * as d3 from 'd3';

class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
      console.log("barchart.js=",this.props.data);
   }
  
   createBarChart() {
      var svg = d3.select("svg"),
      margin = 200,
      width = svg.attr("width") - margin,
      height = svg.attr("height") - margin

      svg.append("text")
         .attr("transform", "translate(80,0)")
         .attr("x", 50)
         .attr("y", 50)
         .attr("font-size", "24px")
         .text("Graphor Food Inventory")

      var xScale = d3.scaleBand().range([0, width]).padding(0.4),
         yScale = d3.scaleLinear().range([height, 0]);


      var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");
         var data = [] ;
         data = this.props.data ;
         //var data = [{"food":"Tacos","quantity":15},{"food":"Hotdogs","quantity":24},{"food":"Pizza","quantity":3},{"food":"Cheese Burger","quantity":8} ,{"food":"Sandwiches","quantity":18 }]    
         console.log("data in barchart=",data);    
         xScale.domain(data.map(function(d) { return d.food; }));
         yScale.domain([0, d3.max(data, function(d) { return d.quantity; })]);

      g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("y", height - 250)
      .attr("x", width - 150)
      .attr("text-anchor", "end")
      .attr("font-size", "12px")
      .attr("stroke", "black")
      .text("Food Items");

    g.append("g")
      .call(d3.axisLeft(yScale) )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-5.1em")
      .attr("dx", "-5.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Number of Food Items in 1000")
      .attr("font-size", "12px")
    
 
      g.append('g')
         .attr('class', 'grid')
         .call(d3.axisLeft()
               .scale(yScale)
               .tickSize(-width, 0, 0)
               .tickFormat(''))

      g.selectAll('rect')
      .data(data)
      .enter()
      .append("rect")
      .attr('fill', 'orange')
      .attr("x", function(d) { return xScale(d.food); })
      .attr("y", function(d) { return yScale(d.quantity); })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) { return height - yScale(d.quantity); })
      .on('mouseenter', function (actual, i) {
         d3.select(this)
         .transition()
         .duration(300)
         .attr('opacity', 0.5)
         .attr('fill' , "blue")
         .attr('text' , "aa")
         .attr('x', (a) => xScale(a.food) - 5)
         .attr('width', xScale.bandwidth() + 10)

         d3.select(this)
         .append('text')
         .text('aaa')
      })
      .on('mouseleave', function (actual, i) {
            d3.select(this)
            .attr('opacity', 1)
            .attr('fill' , "orange")
            .attr('x', (a) => xScale(a.food) + 5)
            .attr('width', xScale.bandwidth() - 1)
      })




   }
   render() { return <svg width="500" height="500"></svg> }
}
export default BarChart