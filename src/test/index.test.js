import React from "react";
import { shallow, render, mount } from "enzyme";
import App from ".././components/App";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { expect } from "chai";
import thunk from "redux-thunk";
import axiosInstance from "../axios-instance";

//mount for high level integrated test
jest.mock("../axios-instance");

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    value: jest.fn(query => {
      const queryMap = {
        "(min-width:650px)": () => window.innerWidth >= 650,
        "(max-width:650px)": () => window.innerWidth < 650
      };
      const queryValue = queryMap[query];
      const matches = queryValue ? queryValue() : false;
      return {
        matches,
        addListener: function() {},
        removeListener: function() {}
      };
    })
  });
  console.log("beforAll begin");
});
describe(">>>redux render passing store directly", () => {
  const initialState = {
    auth: null,
    form: {
      buildControlForm: { values: { salad: 0, cheese: 1, meat: 0, bacon: 0 } }
    },
    shoppingcart: null,
    orders: null
  };
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  let store, container;
  console.log("describe begin");

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
      }, 200);
    });
  });

  beforeEach(() => {
    console.log("beforeEach begin");
    global.innerWidth = 780;
    store = mockStore(initialState);
    container = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("renders without crashing", () => {
    console.log("test 1 begin");
    expect(container.length).equal(1);
  });
  it("should not contain sidebar component", () => {
    expect(container.find("Sidebar")).to.have.length(0);
  });
});
