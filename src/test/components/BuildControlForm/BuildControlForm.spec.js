import { shallow, mount } from "enzyme";
import React from "react";
import WrappedBuildControlForm, {
  BuildControlForm
} from "../../../components/BuildControlForm/BuildControlForm";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

/*after heaps of try, only automatic factory mock could work for module who only export default function, maybe for a module who only export default function, it was deemed as a function.the implementation could be changed per test later and don't need any hoist;
but if a module export object or class,both mock work.
manual mocks always export object or class,the import module needs jest auto hoist (not put under describe )if import this mocked module.
*/
/*
jest.mock("../../../components/hoc/errorShowModal", () => {
  return jest.fn(compo => compo);
});
*/
describe("test pure BuildControlForm", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <BuildControlForm
        formValues={{ salad: 0, cheese: 1, meat: 0, bacon: 1 }}
        reset={jest.fn()}
        handleSubmit={jest.fn()}
      />
    );
  });
  test("create snapshot for bare BuildControlForm component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("BuildControlForm component open modal when click button order", () => {
    wrapper.find('Button[children="Order"]').simulate("click");
    expect(wrapper.state("openModal")).toEqual(true);
  });

  test("BuildControlForm component reset was called when click reset order", () => {
    wrapper.find('Button[children="Reset"]').simulate("click");
    expect(wrapper.instance().props.reset).toHaveBeenCalled();
  });

  test("BuildControlForm component reset was called when click reset order", () => {
    wrapper.find("Grid").simulate("submit");
    expect(wrapper.instance().props.handleSubmit).toHaveBeenCalled();
  });
});

describe("test wrapped BuildControlForm", () => {
  let wrapper;
  const initialState = {
    auth: null,
    form: {
      buildControlForm: { values: { salad: 0, cheese: 1, meat: 0, bacon: 0 } }
    },
    shoppingcart: null,
    orders: null
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);

  //init redux store
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <WrappedBuildControlForm />
      </Provider>
    );
  });
  test("IngredientCtrlField call onChange with value+1 when add button clicked", () => {
    wrapper
      .find("Button")
      .at(0)
      .simulate("click");
    expect(store.getActions()).toContainEqual({
      meta: {
        field: "salad",
        form: "buildControlForm",
        persistentSubmitErrors: false,
        touch: false
      },
      payload: 1,
      type: "@@redux-form/CHANGE"
    });
  });
});
