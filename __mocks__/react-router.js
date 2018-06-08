import React, { Component } from "react";
class Temp extends Component {
  render() {
    return <div />;
  }
}
module.exports = {
  withRouter: jest.fn(() => Temp)
};
