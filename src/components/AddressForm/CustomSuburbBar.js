import React, { Component } from "react";
import { Form, Message, Search, Input } from "semantic-ui-react";
import _ from "lodash";

const AUSUBURB = [
  {
    title: "Vermont South",
    postcode: 3133,
    state: "VIC"
  },
  {
    title: "Burwood",
    postcode: 3152,
    state: "VIC"
  },
  {
    title: "Croydon South",
    postcode: 3136,
    state: "VIC"
  }
];

class CustomSuburbBar extends Component {
  componentWillMount() {
    this.resetComponent();
  }
  resetComponent = () =>
    this.setState({
      isLoading: false,
      results: [],
      value: "",
      postcode: "",
      state: ""
    });

  handleResultSelect = (e, { result }) => {
    this.setState({
      value: result.title,
      postcode: result.postcode,
      state: result.state
    });
  };
  handleSearchChange = (e, { value }) => {
    if (value.length < 1) return this.resetComponent();
    this.setState({ isLoading: true, value });
    const re = new RegExp(_.escapeRegExp(value), "i");
    const isMatch = result => re.test(result.title);
    this.setState({
      isLoading: false,
      results: _.filter(AUSUBURB, isMatch)
    });
  };

  render() {
    let { input, label, meta: { touched, error, warning } } = this.props;
    const { isLoading, value, results } = this.state;
    return (
      <div>
        <Form.Field required>
          <label>{label}</label>
          <Search
            loading={isLoading}
            onResultSelect={(e, { result }) => {
              this.handleResultSelect(e, { result });
              input.onChange(JSON.stringify(result));
            }}
            onSearchChange={(e, { value }) => {
              const handleSearchChange = _.debounce(
                this.handleSearchChange.bind(this),
                500,
                { leading: true }
              );
              handleSearchChange(e, { value });
              input.onChange(value);
            }}
            results={results}
            value={value}
          />
        </Form.Field>
        {(touched && (error && <Message>{error}</Message>)) ||
          (warning && <Message>{warning}</Message>)}
        <Form.Field>
          <label>Postcode</label>
          <Input disabled value={this.state.postcode} />
        </Form.Field>
        <Form.Field>
          <label>State</label>
          <Input disabled value={this.state.state} />
        </Form.Field>
      </div>
    );
  }
}
export { CustomSuburbBar };
