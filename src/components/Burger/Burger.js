import React, { Component } from "react";
import { connect } from "react-redux";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import { fetchIngredients } from "../../actions";
import { formValueSelector } from "redux-form";
import { INGREDIENTS } from "../../config/ingredients";
import _ from "lodash";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import errorShowModal from "../hoc/errorShowModal";
import axios from "../../axios-instance";

class Burger extends Component {
  componentDidMount() {
    this.props.fetchIngredients();
  }
  render() {
    if (this.props.loading) {
      //show loading
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader size="big" inverted>
              Loading
            </Loader>
          </Dimmer>
          <div className="burger" />
        </Segment>
      );
    }
    let transformedIngredients = Object.keys(this.props.ingredients)
      .map(igKey => {
        return [...Array(this.props.ingredients[igKey])].map((_, i) => {
          return <BurgerIngredient key={igKey + i} type={igKey} />;
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
    if (transformedIngredients.length === 0)
      transformedIngredients = <p>Please add some ingredients</p>;
    return (
      <div className="burger">
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const selector = formValueSelector("buildControlForm");
  return {
    loading: state.initIngredients.loading,
    ingredients: selector.apply(null, _.flatten([state, INGREDIENTS]))
  };
}
export default connect(mapStateToProps, { fetchIngredients })(
  errorShowModal(Burger, axios)
);
