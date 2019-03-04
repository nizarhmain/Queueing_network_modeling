import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import BarChart from "./components/BarChart";
import Launcher from "./components/Launcher"

class App extends Component {
	state = {
		data: [12, 5, 6, 6, 9, 10],
		width: 700,
		height: 500
	};

	render() {
		return (
			<div className="App">

				<Launcher />

				<div className="barChart">
					<BarChart
						data={this.state.data}
						width={this.state.width}
						height={this.state.height}
					/>
				</div>
			</div>
		);
	}
}

export default App;
