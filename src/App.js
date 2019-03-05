import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import BarChart from "./components/BarChart";
import Launcher from "./components/Launcher";
import Network from "./components/Network";
import Markov from "./components/Markov";

class App extends Component {
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 800,
    height: 800
  };

  render() {
    return (
		<div className="App">
	  
        <Launcher />

        <Network width={this.state.width} height={this.state.height} />

        <Markov/>
        
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
