import React, { Component } from "react";
import * as d3 from "d3";

import axios from "axios";
import Button from "antd/lib/button";
import { Input, Row, Col } from "antd";

class Launcher extends Component {
  state = {
    loading: false,
    iconLoading: false
  };

  fetch_results = () => {
    let url = `http://localhost:8000/result`;
    return fetch(url, {
      method: "GET" // *GET, POST, PUT, DELETE, etc.
      //body: script // body data type must match "Content-Type" header
    })
      .then(response => response.text())
      .then(result => {
        console.log(result);
      });
  };

  reset_simulation = () => {
    let url = `http://localhost:8000/reset`;
    return fetch(url, {
      method: "GET" // *GET, POST, PUT, DELETE, etc.
      //body: script // body data type must match "Content-Type" header
    })
      .then(response => response.text())
      .then(result => {
        console.log(result);
      });
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  render() {
    return (
      <div>
        <Row style={{ marginTop: "20%" }}>
          <Col span={8} offset={8}>
            <Input
              style={{ margin: 10 }}
              placeholder="input with clear icon"
              allowClear
              onChange={this.onChange}
            />
            <Input
              style={{ margin: 10 }}
              placeholder="input with clear icon"
              allowClear
              onChange={this.onChange}
            />
            <Col span={12}>
            <Button
              type="primary"
              loading={this.state.loading}
              onClick={this.reset_simulation}
            >
              Reset
            </Button>
            </Col>
            <Col span={12}>
            <Button
              type="primary"
              loading={this.state.loading}
              onClick={this.fetch_results}
            >
              Launch
            </Button>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Launcher;
