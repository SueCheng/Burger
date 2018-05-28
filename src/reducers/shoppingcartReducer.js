import { FETCH_SHOPPINGCART } from "../actions/types";
export default function(state = { loading: true, cartItems: null }, action) {
  switch (action.type) {
    case FETCH_SHOPPINGCART:
      return { loading: false, cartItems: action.payload };
    default:
      return state;
  }
}
