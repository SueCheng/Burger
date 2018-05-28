import React, { Component } from "react";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { CustomNameBar } from "./CustomNameBar";
import { CustomSuburbBar } from "./CustomSuburbBar";
import { Form, Message } from "semantic-ui-react";
import axiosInstance from "../../axios-instance";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import errorShowModal from "../hoc/errorShowModal";
import { addOrder } from "../../actions";

class AddressForm extends Component {
  async submit(values) {
    const order = {
      //set the totalPrice here
      totalPrice:
        this.props.cartItems
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue.price,
            0
          )
          .toFixed(1) * 1,
      address: JSON.stringify(values),
      items: this.props.cartItems,
      status: "paid"
    };
    let res = this.props.addOrder(order);
    //add order success then go to homepage, or if fail ,show the specific reason
    res.then(res => {
      if (res) {
        if (res.status === 200) this.props.history.push("/");
        else throw new SubmissionError({ _error: res.data });
      } else {
        throw new SubmissionError({ _error: "Network Error Detected" });
      }
    });
  }
  render() {
    return (
      <Form
        onSubmit={this.props.handleSubmit(this.submit.bind(this))}
        style={{ marginTop: 20 }}
      >
        {this.props.error && <strong>{this.props.error}</strong>}
        <Form.Group>
          <Field name="firstName" component={CustomNameBar} label="FirstName" />
          <Field name="lastName" component={CustomNameBar} label="LastName" />
        </Form.Group>
        <Field name="number" component={CustomNameBar} label="Number" />
        <Field name="street" component={CustomNameBar} label="Street Address" />
        <Field name="suburb" component={CustomSuburbBar} label="Suburb" />
        <Message>
          <p>Don't enter Post Box address,Please enter physical address </p>
        </Message>
        <Form.Group widths="equal">
          <Form.Button type="submit">Order</Form.Button>
          <Form.Button onClick={() => this.props.history.push("/")}>
            Cancel
          </Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "must be 15 characters or less";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 15) {
    errors.lastName = "must be 15 characters or less";
  }
  if (!values.number) {
    errors.number = "Required";
  } else if (!/^\d{1,4}$/i.test(values.number)) {
    errors.number = "must be 1-4 digits";
  }
  if (!values.street) {
    errors.street = "Required";
  } else if (values.street.length > 25) {
    errors.street = "must be 25 characters or less";
  }
  return errors;
};
AddressForm = reduxForm({
  form: "addressForm",
  validate
})(AddressForm);

function mapStateToProps(state) {
  return {
    cartItems: _.omit(state.shoppingcart, "loading").cartItems
  };
}
AddressForm = connect(mapStateToProps, { addOrder })(AddressForm);
AddressForm = withRouter(AddressForm);
AddressForm = errorShowModal(AddressForm, axiosInstance);
export default AddressForm;
