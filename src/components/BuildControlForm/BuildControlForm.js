import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import IngredientCtrlField from "./IngredientCtrlField";
import _ from "lodash";
import { INGREDIENTS } from "../../config/ingredients";
import { Grid, Button } from "semantic-ui-react";
import { TotalPrice } from "./TotalPrice";
import ConfirmModal from "./ConfirmModal";

class buildControlForm extends Component {
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
        <Grid.Row>
          <Grid.Column computer={5}>
            <Button type="button" onClick={this.showModal.bind(this)}>
              Order
            </Button>
            <ConfirmModal
              open={this.state.openModal}
              onClose={this.closeModal.bind(this)}
            />
          </Grid.Column>
          <Grid.Column computer={5}>
            <Button type="button" onClick={this.props.reset}>
              Reset
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

buildControlForm = connect(state => ({
  formValues: state.form.buildControlForm.values
}))(buildControlForm);

buildControlForm = reduxForm({
  form: "buildControlForm",
  enableReinitialize: true
})(buildControlForm);

buildControlForm = connect(state => ({
  initialValues: _.pick(state.initIngredients, INGREDIENTS)
}))(buildControlForm);

export default buildControlForm;
