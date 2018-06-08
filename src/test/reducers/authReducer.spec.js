import authReducer from "../../reducers/authReducer";
import * as types from "../../actions/types";

describe("authReducer INIT FETCH_AUTH action", () => {
  test("INIT action initiate state to null", () => {
    const state = null;
    expect(authReducer(state, { type: "@@INIT" })).toEqual(null);
  });

  test("FETCH_AUTH action return state to be payload with data inside", () => {
    const state = null;
    const payload = {
      local: { userName: "aa" },
      loginMethod: "local",
      credit: 0,
      shoppingCart: []
    };
    expect(authReducer(state, { type: types.FETCH_AUTH, payload })).toEqual(
      payload
    );
  });
  test("FETCH_AUTH action return state to be payload with no data", () => {
    const state = null;
    expect(
      authReducer(state, { type: types.FETCH_AUTH, payload: null })
    ).toEqual(false);
  });
});
