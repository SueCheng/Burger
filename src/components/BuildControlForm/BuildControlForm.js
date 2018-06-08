import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import IngredientCtrlField from "./IngredientCtrlField";
import { INGREDIENTS } from "../../config/ingredients";
import { Grid, Button } from "semantic-ui-react";
import { TotalPrice } from "./TotalPrice";
import ConfirmModal from "./ConfirmModal";

export class BuildControlForm extends Component {
  state = { openModal: false };
  showModal() {
    this.setState({ openModal: true });
  }
  closeModal() {
    this.setState({ openModal: false });
  }
  submit(values) {
    console.log(values);
  }
  renderIngredientCtrl() {
    return INGREDIENTS.map(ingredientName => {
      return (
        <Field
          key={ingredientName}
          label={ingredientName}
          name={ingredientName}
          component={IngredientCtrlField}
        />
      );
    });
  }
  render() {
    let ctrls = this.renderIngredientCtrl();
    return (
      <Grid
        as={"form"}
        centered
        onSubmit={this.props.handleSubmit(this.submit)}
      >
        <TotalPrice formValues={this.props.formValues} />
        {ctrls}
        <div>
          <Button
            type="button"
            style={{ marginBottom: 10, marginRight: 10 }}
            onClick={this.showModal.bind(this)}
          >
            Order
          </Button>
          <Button
            type="button"
            style={{ marginRight: 10 }}
            onClick={this.props.reset}
          >
            Reset
          </Button>
          <ConfirmModal
            open={this.state.openModal}
            onClose={this.closeModal.bind(this)}
            resetParentForm={this.props.reset.bind(this)}
          />
        </div>
      </Grid>
    );
  }
}

let WrappedBuildControlForm = connect(state => ({
  formValues: state.form.buildControlForm.values
}))(BuildControlForm);

WrappedBuildControlForm = reduxForm({
  form: "buildControlForm",
  enableReinitialize: true,
  initialValues: { salad: 0, bacon: 0, cheese: 0, meat: 0 }
})(WrappedBuildControlForm);

export default WrappedBuildControlForm;
