import { FETCH_INGREDIENTS } from "../actions/types";

export default function(state = { loading: true }, action) {
  switch (action.type) {
    case FETCH_INGREDIENTS:
      return { loading: false, ...action.payload.data };
    default:
      return state;
  }
}
