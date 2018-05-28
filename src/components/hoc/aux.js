import React, { Component } from "react";

const Aux = WrappedComponent =>
  class extends Component {
    render() {
      return (
        <div>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };

export default Aux;
