import { FETCH_SHOPPINGCART } from "../actions/types";
export default function(state = { loading: true }, action) {
  switch (action.type) {
    case FETCH_SHOPPINGCART:
      return { loading: false, ...action.payload.data };
    default:
      return state;
  }
}
