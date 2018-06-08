import { ShoppingCart } from "../../components/ShoppingCart";
import { shallow } from "enzyme";
import React from "react";

describe("create snapshot for givin fake data", () => {
  let tree;
  beforeEach(() => {
    tree = shallow(
      <ShoppingCart fetchShoppingcart={jest.fn()} loading={true} />
    );
  });
  test(" snapshot with loading", () => {
    expect(tree).toMatchSnapshot();
  });

  test(" snapshot with no cartItem and loading false", () => {
    tree.setProps({
      loading: false,
      cartItems: []
    });
    expect(tree).toMatchSnapshot();
  });
  test(" snapshot with 2 cartItems", () => {
    tree.setProps({
      loading: false,
      cartItems: [
        {
          category: "burger",
          quantity: 1,
          price: 3.2,
          config: { salad: 0, cheese: 1, bacon: 0, meat: 0 }
        },
        {
          category: "burger",
          quantity: 1,
          price: 14.5,
          config: { salad: 0, cheese: 1, bacon: 2, meat: 1 }
        }
      ]
    });
    expect(tree).toMatchSnapshot();
  });
});
