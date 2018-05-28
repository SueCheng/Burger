import { combineReducers } from "redux";
import shoppingcartReducer from "./shoppingcartReducer";
import ordersReducer from "./ordersReducer";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
/*
function rootReducer(state, action) {
  const combineReducer = combineReducers({
    initIngredients: initIngredientsReducer,
    form: formReducer
  });
  const intermediateState = combineReducer(state, action);
  const finalState = getError(intermediateState, action);
  return finalState;
}
//get error attribute out from initIngredients
function getError(intermediateState, action) {
  switch (action.type) {
    case FETCH_INGREDIENTS_FAIL:
      return {
        initIngredients: _.pick(intermediateState.initIngredients, [
          "loading",
          ...INGREDIENTS
        ]), //slice error attribute
        form: formReducer,
        error: intermediateState.initIngredients.error
      };
    default:
      return intermediateState;
  }
}

export default rootReducer;
*/
export default combineReducers({
  auth: authReducer,
  form: formReducer,
  shoppingcart: shoppingcartReducer,
  orders: ordersReducer
});
