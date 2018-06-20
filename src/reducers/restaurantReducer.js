import { FETCH_RESTAURANT_LIST } from "../actions/types";
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_RESTAURANT_LIST:
      return action.payload || [];
    default:
      return state;
  }
}
