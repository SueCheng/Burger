import { FETCH_ORDERS } from "../actions/types";
export default function(state = { loading: true, orderList: null }, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return { loading: false, orderList: action.payload };
    default:
      return state;
  }
}
