import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import ShoppingCart from "./ShoppingCart";
import AddressForm from "./AddressForm/AddressForm";

class Checkout extends Component {
  render() {
    return (
      <Container>
        <ShoppingCart isCheckoutPage={true} />
        <AddressForm />
      </Container>
    );
  }
}
export default Checkout;
