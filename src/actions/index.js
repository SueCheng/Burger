import axiosInstance from "../axios-instance";
import { FETCH_INGREDIENTS, FETCH_SHOPPINGCART, FETCH_ORDERS } from "./types";

export const fetchIngredients = () => async dispatch => {
  let res;
  try {
    res = await axiosInstance.get("/ingredients.json");
  } catch (error) {
    return;
  }
  dispatch({
    type: FETCH_INGREDIENTS,
    payload: res
  });
};
export const fetchShoppingcart = () => async dispatch => {
  let res;
  try {
    res = await axiosInstance.get("/shoppingcart.json");
  } catch (error) {
    return;
  }
  dispatch({
    type: FETCH_SHOPPINGCART,
    payload: res
  });
};
export const fetchOrders = () => async dispatch => {
  let res;
  try {
    res = await axiosInstance.get("/orders.json");
  } catch (error) {
    return;
  }
  dispatch({
    type: FETCH_ORDERS,
    payload: res
  });
};

/*
export const confirmOrder = async order => {
  try {
    await axiosInstance.post("/orders.json", order);
  } catch (error) {
    return;
  }
};
*/
