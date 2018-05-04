import React, { Component } from "react";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { CustomNameBar } from "./CustomNameBar";
import { CustomSuburbBar } from "./CustomSuburbBar";
import { Form, Message } from "semantic-ui-react";
import axiosInstance from "../../axios-instance";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class AddressForm extends Component {
  async submit(values) {
    try {
      const order = {
        address: values,
        cartItems: this.props.cartItems,
        status: "paid"
      };
      await axiosInstance.post("/orders.json", order);
      this.props.history.push("/orders");
    } catch (error) {
      //error has been handled by axios inteceptors to show a modal dialog of error. keep going to checkout page
      throw new SubmissionError({
        _error: "Order failed"
      });
    }
  }
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.submit.bind(this))}>
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
    cartItems: _.values(_.omit(state.shoppingcart, "loading"))
  };
}
AddressForm = connect(mapStateToProps)(AddressForm);
AddressForm = withRouter(AddressForm);
export default AddressForm;
