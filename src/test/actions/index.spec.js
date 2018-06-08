import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../actions";
import * as types from "../../actions/types";
import axiosInstance from "../../axios-instance";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("../../axios-instance");

describe("async fetch local login user produce action", () => {
  test("create FETCH_AUTH when fetching user has been done", () => {
    axiosInstance.get.mockImplementation(() => {
      const resp = {
        data: {
          local: { userName: "aa" },
          loginMethod: "local",
          credit: 0,
          shoppingCart: []
        }
      };

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(resp);
        }, 1000);
      });
    });
    //mock axiosInstance.get(url),let it give response of req->user to be local userName:aa  credit:0 ...,shoppingCart:[]

    //fetchUser return promise,and this promise's then is (data=>action{FETCH_AUTH,payload:as above},action{FETCH_SHOPPINGCART,payload:[]})
    const expectedActions = [
      {
        type: types.FETCH_AUTH,
        payload: { local: { userName: "aa" }, loginMethod: "local", credit: 0 }
      },
      { type: types.FETCH_SHOPPINGCART, payload: [] }
    ];
    const store = mockStore({
      auth: null,
      form: {
        buildControlForm: { values: { sald: 0, cheese: 1, meat: 0, bacon: 0 } }
      },
      shoppingcart: null,
      orders: null
    });
    expect.assertions(1);
    return store.dispatch(actions.fetchUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  //test there is data segment from network
  test("create FETCH_AUTH with payload false when fetching user encounter data segment not exist", () => {
    axiosInstance.get.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({});
        }, 1000);
      });
    });
    //mock axiosInstance.get(url),let it give response of req->user to be local userName:aa  credit:0 ...,shoppingCart:[]

    //fetchUser return promise,and this promise's then is (data=>action{FETCH_AUTH,payload:as above},action{FETCH_SHOPPINGCART,payload:[]})
    const expectedActions = [
      {
        type: types.FETCH_AUTH,
        payload: false
      }
    ];
    const store = mockStore({
      auth: null,
      form: {
        buildControlForm: { values: { sald: 0, cheese: 1, meat: 0, bacon: 0 } }
      },
      shoppingcart: null,
      orders: null
    });
    expect.assertions(1);
    return store.dispatch(actions.fetchUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  //test network error
  test("create FETCH_AUTH with payload false when fetching user encounter system error", () => {
    axiosInstance.get.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("System Error maybe network disconnected"));
        }, 1000);
      });
    });
    //mock axiosInstance.get(url),let it give response of req->user to be local userName:aa  credit:0 ...,shoppingCart:[]

    //fetchUser return promise,and this promise's then is (data=>action{FETCH_AUTH,payload:as above},action{FETCH_SHOPPINGCART,payload:[]})
    const expectedActions = [
      {
        type: types.FETCH_AUTH,
        payload: false
      }
    ];
    const store = mockStore({
      auth: null,
      form: {
        buildControlForm: { values: { sald: 0, cheese: 1, meat: 0, bacon: 0 } }
      },
      shoppingcart: null,
      orders: null
    });
    expect.assertions(1);
    return store.dispatch(actions.fetchUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
