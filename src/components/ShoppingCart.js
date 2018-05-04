import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Dimmer, Loader, Table, Label } from "semantic-ui-react";
import { INGREDIENTS } from "../config/ingredients.js";
import { fetchShoppingcart } from "../actions";
import _ from "lodash";

class ShoppingCart extends Component {
  componentDidMount() {
    this.props.fetchShoppingcart();
  }
  ingredientNameCtrls() {
    return INGREDIENTS.map(ingredient => {
      return <Table.HeaderCell key={ingredient}>{ingredient}</Table.HeaderCell>;
    });
  }
  cartItemCtrls(cartItem, index) {
    return (
      <Table.Row key={index}>
        <Table.Cell>
          <Label ribbon>Burger</Label>
        </Table.Cell>
        {INGREDIENTS.map(ingredient => {
          return (
            <Table.Cell key={ingredient}>{cartItem[ingredient]}</Table.Cell>
          );
        })}
        <Table.Cell>{cartItem.price}</Table.Cell>
      </Table.Row>
    );
  }
  render() {
    if (this.props.loading) {
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
    }
    return (
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            {this.ingredientNameCtrls()}
            <Table.HeaderCell>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.cartItems.map((cartItem, index) =>
            this.cartItemCtrls(cartItem, index)
          )}
        </Table.Body>
      </Table>
    );
  }
}
function mapStateToProps(state) {
  return {
    loading: state.shoppingcart.loading,
    cartItems: _.values(_.omit(state.shoppingcart, "loading"))
  };
}
export default connect(mapStateToProps, { fetchShoppingcart })(ShoppingCart);
