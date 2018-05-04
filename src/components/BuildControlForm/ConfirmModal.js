import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { INGREDIENTS } from "../../config/ingredients.js";
import { Grid, List, Label } from "semantic-ui-react";
import { TotalPrice, calculatePrice } from "./TotalPrice";
import { withRouter } from "react-router";
import axiosInstance from "../../axios-instance";

class ConfirmModal extends Component {
  confirmShoppingcart = async (product, history) => {
    try {
      await axiosInstance.post("/shoppingcart.json", product);
      history.push("/checkout");
    } catch (error) {
      //error has been handled by axios inteceptors to show a modal dialog of error. keep going to checkout page
      return;
    }
  };
  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header>Confirm your order</Modal.Header>
        <Modal.Content>
          <p>You've ordered a burger with ingredients:</p>
          <List>
            {INGREDIENTS.map(ingredient => {
              return (
                <List.Item key={ingredient}>
                  <Grid centered columns={8}>
                    <Grid.Column>
                      <Label>{ingredient}</Label>
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                      <Label>{this.props.formValues[ingredient]}</Label>
                    </Grid.Column>
                  </Grid>
                </List.Item>
              );
            })}
          </List>
          <TotalPrice formValues={this.props.formValues} />
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            onClick={() => {
              this.confirmShoppingcart(
                {
                  price: calculatePrice(this.props.formValues),
                  ...this.props.formValues
                },
                this.props.history
              );
            }}
          >
            Confirm
          </Button>
          <Button onClick={this.props.onClose}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.buildControlForm.values };
}
ConfirmModal = connect(mapStateToProps)(ConfirmModal);

//make ConfirmModal get history prop
ConfirmModal = withRouter(ConfirmModal);

export default ConfirmModal;
