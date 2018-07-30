import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../actions";
import _ from "lodash";
import {
  Container,
  Segment,
  Dimmer,
  Loader,
  Table,
  List,
  Message
} from "semantic-ui-react";
import { itemSchema } from "../config/itemSchema.js";
import errorShowModal from "./hoc/errorShowModal";
import axiosInstance from "../axios-instance";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
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
  orderItemCtrls(orderItem, index, bigScreen) {
    return (
      <Table.Row key={index} textAlign={bigScreen ? "center" : "left"}>
        {itemSchema.map(itemKey => {
          if (itemKey === "config")
            return (
              <Table.Cell key={itemKey}>
                {JSON.stringify(orderItem[itemKey])}
              </Table.Cell>
            );
          else
            return <Table.Cell key={itemKey}>{orderItem[itemKey]}</Table.Cell>;
        })}
      </Table.Row>
    );
  }
  orderTable(order, index) {
    let bigScreen = true;
    if (window.matchMedia("(max-width:650px)").matches) bigScreen = false;
    return (
      <Fragment key={index}>
        <Table structured celled>
          {bigScreen && this.headerCtrls()}
          <Table.Body>
            {order.items.map((orderItem, index) =>
              this.orderItemCtrls(orderItem, index, bigScreen)
            )}
          </Table.Body>
        </Table>
        <List divided>
          <List.Item>
            <List.Content floated={bigScreen ? "right" : "left"}>
              Total Price {order.totalPrice.toFixed(1)}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated={bigScreen ? "right" : "left"}>
              Address {order.address}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated={bigScreen ? "right" : "left"}>
              Status {order.status}
            </List.Content>
          </List.Item>
        </List>
      </Fragment>
    );
  }
  /*orderItemCtrls(orderItem, index) {
    return (
      <Fragment key={index}>
        <Table.Row key={`${index}0`}>
          <Table.Cell rowSpan={orderItem.cartItems.length}>
            {JSON.stringify(orderItem.address)}
          </Table.Cell>
          <Table.Cell rowSpan={orderItem.cartItems.length}>
            {orderItem.status}
          </Table.Cell>
          <Table.Cell>{JSON.stringify(orderItem.cartItems[0])}</Table.Cell>
        </Table.Row>
        {_.slice(orderItem.cartItems, 1).map((cartItem, i) => {
          return (
            <Table.Row key={i}>
              <Table.Cell>{JSON.stringify(cartItem)}</Table.Cell>
            </Table.Row>
          );
        })}
      </Fragment>
    );
  }*/
  renderOrderTables() {
    if (this.props.orderList.length > 0)
      return this.props.orderList.map((order, index) => {
        return this.orderTable(order, index);
      });
    else return <Message>You haven't order anything</Message>;
  }
  render() {
    if (this.props.loading) {
      //show loading
      return (
        <Segment className="zindexLessHead">
          <Dimmer active inverted>
            <Loader size="large" inverted>
              Loading
            </Loader>
          </Dimmer>
          <div className="orderLoadingBackground" />
        </Segment>
      );
    }
    return <Container>{this.renderOrderTables()}</Container>;
  }
}
function mapStateToProps(state) {
  return {
    loading: state.orders.loading,
    orderList: _.omit(state.orders, "loading").orderList
  };
}

Orders = connect(mapStateToProps, { fetchOrders })(Orders);
Orders = errorShowModal(Orders, axiosInstance);
export default Orders;
