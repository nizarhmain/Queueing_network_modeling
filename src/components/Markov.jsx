import React, { Component } from "react";
import * as d3 from "d3";

class Markov extends Component {
  componentDidMount() {
    this.drawChart();
  }

  onChange = e => {
    console.log(e);
  };

  drawChart() {
    class MarkovChain {
      constructor(transitionMatrix) {
        this.transitionMatrix = transitionMatrix;
        this.state = 0;
      }

      transition() {
        let rect = d3.select("rect"),
            x = +rect.attr(485),
            y = +rect.attr(681),
            fill = +rect.attr("lightgreen"),
            width = +rect.attr(200),
          height = +rect.attr(200);

        var rectTransition = rect.transition();

        var sampledProb = Math.random();
        var nextState = 0;
        var requiredProb;

        //console.log('Sample prob:', sampledProb);

        for (var i = 0; i < this.transitionMatrix.length; i++) {
          requiredProb = this.transitionMatrix[this.state][i];
          nextState = i;

          //console.log(data.nodes[nextState])
          rectTransition
            .attr(
              "transform",
              `translate(${data.nodes[nextState].x},${data.nodes[nextState].y})`
            )
            .duration(500);

          //console.log('Required prob:', requiredProb);

          if (sampledProb < requiredProb) {
            break;
          } else {
            sampledProb -= requiredProb;
          }
        }

        //console.log('Next state:', nextState);
        this.state = nextState;
      }
    }

    var data = {
      nodes: [
        { id: "A", x: 100, y: 100 },
        { id: "B", x: 200, y: 100 },
        { id: "C", x: 300, y: 100 }
      ],
      edges: [
        { source: 0, target: 0, probability: 0.5 },
        { source: 0, target: 1, probability: 0.5 },
        { source: 1, target: 0, probability: 0.9 },
        { source: 1, target: 1, probability: 0.1 }
      ]
    };

    var svg = d3.select(".chart"),
      width = +svg.attr(800),
      height = +svg.attr(800);

    var nodes = svg
      .selectAll("image")
      .data(data.nodes)
      .enter()
      .append("image")
      .attr("id", function(d, i) {
        return "node_" + i;
      })
      .attr("class", "node")
      .attr("xlink:href", "https://svgsilh.com/svg/2237420.svg")
      .attr("width", 50)
      .attr("height", 50)
      //.attr('r', 15)
      .attr("x", function(d) {
        return d.x;
      })
      .attr("y", function(d) {
        return d.y;
      })
      .call(d3.drag().on("drag", drag));

    
    function drag(d) {
      d.x = d3.event.x;
      d.y = d3.event.y;

      d3.select(this)
        .attr("x", d.x)
        .attr("y", d.y);

      
    }

    function simulate() {
      let markov = new MarkovChain([
        [0.3, 0.3, 0.3],
        [0.3, 0.3, 0.3],
        [0.3, 0.3, 0.3]
      ]);

      window.setInterval(function() {
        const $ = window.$;

        $("#node_" + markov.state).removeClass("current-node");
        markov.transition();
        $("#node_" + markov.state).addClass("current-node");
      }, 1000);
    }

    simulate();
  }

  render() {
    return (
      <div id={"#" + this.props.id}>
      </div>
    );
  }
}

export default Markov;
