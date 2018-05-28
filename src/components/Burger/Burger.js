import React, { Component } from "react";
import { connect } from "react-redux";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import { formValueSelector } from "redux-form";
import { INGREDIENTS } from "../../config/ingredients";
import _ from "lodash";
import errorShowModal from "../hoc/errorShowModal";
import axios from "../../axios-instance";

class Burger extends Component {
  render() {
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
    ingredients: selector.apply(null, _.flatten([state, INGREDIENTS]))
  };
}
export default connect(mapStateToProps)(errorShowModal(Burger, axios));
