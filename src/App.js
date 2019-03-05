import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import BarChart from "./components/BarChart";
import Launcher from "./components/Launcher";
import Network from "./components/Network";
import Markov from "./components/Markov";

import { Input, Row, Col } from "antd";

class App extends Component {
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: "1000",
    height: "1000"
  };

  render() {
    return (
      <div className="App">
        <Row>
          <h1>Queueing Systems - Network modeling</h1>
          <Col span={9}>
            <Launcher />
          </Col>
          <Col span={12}>
            <Network width={this.state.width} height={this.state.height} />
          </Col>
          <Col span={12}>
            <Markov />
          </Col>

        </Row>
      </div>
    );
  }
}

/*

<div className="barChart">
          <BarChart
            data={this.state.data}
            width={this.state.width}
            height={this.state.height}
          />
        </div>

*/

export default App;
