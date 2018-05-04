import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../actions";
import _ from "lodash";
import { Segment, Dimmer, Loader, Table } from "semantic-ui-react";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }
  orderItemCtrls(orderItem, index) {
    return (
      <Fragment key={index}>
        <Table.Row /*key={`${index}0`}*/>
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
  }
  render() {
    if (this.props.loading) {
      //show loading
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader size="large" inverted>
              Loading
            </Loader>
          </Dimmer>
          <div className="orderLoadingBackground" />
        </Segment>
      );
    }
    return (
      <Table unstackable structured celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Items</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.orderList.map((orderItem, index) =>
            this.orderItemCtrls(orderItem, index)
          )}
        </Table.Body>
      </Table>
    );
  }
}
function mapStateToProps(state) {
  return {
    loading: state.orders.loading,
    orderList: _.values(_.omit(state.orders, "loading"))
  };
}
Orders = connect(mapStateToProps, { fetchOrders })(Orders);
export default Orders;
