import { FETCH_ORDERS } from "../actions/types";
export default function(state = { loading: true }, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return { loading: false, ...action.payload.data };
    default:
      return state;
  }
}
