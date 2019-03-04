import React, {Component} from 'react';
import * as d3 from "d3";
import Button from 'antd/lib/button';
import { Input } from 'antd';

class BarChart extends Component {
    componentDidMount() {
      this.drawChart();
    }

    onChange = (e) => {
      console.log(e);
    };
      
    drawChart() {
      const data = [12, 5, 6, 6, 9, 10];
         
      const svg = d3.select("body").append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height)
      .style("margin-left", 100);

      

      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => this.props.height - 10 * d)
        .attr("width", 65)
        .attr("height", (d, i) => d * 10)
        .attr("fill", "green")
    }
          
    render(){
      return( 
      <div id={"#" + this.props.id}>
      
      <Input placeholder="input with clear icon" allowClear onChange={this.onChange} />
      <Input placeholder="input with clear icon" allowClear onChange={this.onChange} />
      <Button type="primary">Button</Button>
      </div>
      )
    }
  }
      
  export default BarChart;