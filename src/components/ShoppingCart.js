import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Segment,
  Dimmer,
  Loader,
  Table,
  Button
} from "semantic-ui-react";
import { itemSchema } from "../config/itemSchema.js";
import { fetchShoppingcart } from "../actions";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import errorShowModal from "./hoc/errorShowModal";
import axiosInstance from "../axios-instance";
import Aux from "./hoc/aux";
/*
 category: String,
  quantity: Number,
  price: Number,
  config: { type: Map, of: Number }
  */
class ShoppingCart extends Component {
  componentDidMount() {
    if (!this.props.isCheckoutPage)
      //if it's checkout page,don't fetch again
      this.props.fetchShoppingcart();
  }
  headerCtrls() {
    return (
      <Table.Header>
        <Table.Row textAlign="center">
          {itemSchema.map(itemKey => {
            return <Table.HeaderCell key={itemKey}>{itemKey}</Table.HeaderCell>;
          })}
        </Table.Row>
      </Table.Header>
    );
  }
  cartItemCtrls(cartItem, index) {
    return (
      <Table.Row key={index} textAlign="center">
        {itemSchema.map(itemKey => {
          if (itemKey === "config")
            return (
              <Table.Cell key={itemKey}>
                {JSON.stringify(cartItem[itemKey])}
              </Table.Cell>
            );
          else
            return <Table.Cell key={itemKey}>{cartItem[itemKey]}</Table.Cell>;
        })}
      </Table.Row>
    );
  }
  gotoPay() {
    if (!this.props.isCheckoutPage && this.props.cartItems.length > 0)
      return (
        <Button as={Aux(NavLink)} exact to="/checkout">
          Go to Pay
        </Button>
      );
  }
  render() {
    if (this.props.loading)
      //show loading
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader size="medium" inverted>
              Loading
            </Loader>
          </Dimmer>
          <div className="scLoadingBackground" />
        </Segment>
      );
    else
      return (
        <Container>
          <Table structured celled>
            {this.headerCtrls()}
            <Table.Body>
              {this.props.cartItems.map((cartItem, index) =>
                this.cartItemCtrls(cartItem, index)
              )}
            </Table.Body>
          </Table>
          {this.gotoPay()}
        </Container>
      );
  }
}
function mapStateToProps(state) {
  return {
    loading: state.shoppingcart.loading,
    cartItems: _.omit(state.shoppingcart, "loading").cartItems
  };
}

ShoppingCart = connect(mapStateToProps, { fetchShoppingcart })(ShoppingCart);
ShoppingCart = errorShowModal(ShoppingCart, axiosInstance);

export default ShoppingCart;
