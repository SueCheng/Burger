import React, { Component } from "react";
import { connect } from "react-redux";
import { INGREDIENTS } from "../../config/ingredients.js";
import { Button, Modal, Grid, List, Label } from "semantic-ui-react";
import { TotalPrice, calculatePrice } from "./TotalPrice";
import { withRouter } from "react-router";
import axiosInstance from "../../axios-instance";
import errorShowModal from "../hoc/errorShowModal";
import { addItemToShoppingcart } from "../../actions";

var formValueToString = function(formValue) {
  let result = {};
  Object.keys(formValue).forEach(
    key => (result[key] = formValue[key].toString())
  );
  return result;
};
class ConfirmModal extends Component {
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
              this.props.addItemToShoppingcart([
                {
                  category: "Burger",
                  quantity: 1,
                  price: calculatePrice(this.props.formValues),
                  config: formValueToString(this.props.formValues)
                }
              ]);
              //close this ConfirmModal,reset parent form and don't respond to server submission fail
              this.props.onClose();
              this.props.resetParentForm();
            }}
          >
            Add to ShoppingCart
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
ConfirmModal = connect(mapStateToProps, { addItemToShoppingcart })(
  ConfirmModal
);

//make ConfirmModal get history prop
ConfirmModal = withRouter(ConfirmModal);

ConfirmModal = errorShowModal(ConfirmModal, axiosInstance);

export default ConfirmModal;
