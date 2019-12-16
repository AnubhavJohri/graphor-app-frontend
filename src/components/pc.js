import React, { Component } from 'react'
import '../App.css'
import { max } from 'd3-array'
import * as d3 from 'd3';
import '../App.css'

class PC extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
      
    var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin

svg.append("text")
   .attr("transform", "translate(100,0)")
   .attr("x", 50)
   .attr("y", 50)
   .attr("font-size", "24px")
   .text("XYZ Foods Stock Price")

var xScale = d3.scaleBand().range([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
           .attr("transform", "translate(" + 100 + "," + 100 + ")");
console.log("before d3.json");

//var data = [{"food":"Hotdogs","quantity":24},{"food":"Tacos","quantity":15},{"food":"Pizza","quantity":3},{"food":"Double Quarter Pounders with Cheese","quantity":2},{"food":"Omelets","quantity":30},{"food":"Falafel and Hummus","quantity":21},{"food":"Soylent","quantity":13}]
var data = [{"food":"Tacos","quantity":15},{"food":"Hotdogs","quantity":24},{"food":"Pizza","quantity":3},{"food":"Cheese Burger","quantity":8} ,{"food":"Sandwiches","quantity":18 }]    
//console.log("data=",data);
//var data = this.props.data ;
    

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
     .text("Food Quantity");

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
    //  var scale=10;
    //  g.selectAll('rect')
    //   .data(data).enter()
    //         .append('rect')
    //         .attr('width', 40)
    //         .attr('height', (datapoint) => datapoint * scale)
    //         .attr('fill', 'orange')
    //         .attr('x', (datapoint, iteration) => iteration * 70)
    //         .attr('y', (datapoint) => height - datapoint * scale)

    g.selectAll('rect')
     .data(data)
     .enter()
     .append("rect")
    //  .attr("class", "bar")
     .attr('fill', 'steelblue')
     .attr("x", function(d) { return xScale(d.food); })
     .attr("y", function(d) { return yScale(d.quantity); })
     .attr("width", xScale.bandwidth())
     .attr("height", function(d) { return height - yScale(d.quantity); });


   }
   render() { return <svg width="600" height="500"></svg> }
}
export default PC