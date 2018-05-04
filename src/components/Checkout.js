import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import ShoppingCart from "./ShoppingCart";
import AddressForm from "./AddressForm/AddressForm";

class Checkout extends Component {
  render() {
    return (
      <div>
        <Grid centered>
          <Grid.Row>
            <Grid.Column computer={6}>
              <ShoppingCart />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={6}>
              <AddressForm />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
export default Checkout;
