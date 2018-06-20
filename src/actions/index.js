import axiosInstance from "../axios-instance";
import {
  FETCH_AUTH,
  FETCH_SHOPPINGCART,
  FETCH_ORDERS,
  FETCH_RESTAURANT_LIST
} from "./types";
import _ from "lodash";

export const fetchRestaurantList = key => async dispatch => {
  let res;
  try {
    res = await axiosInstance.get(`/data/restaurantlist/search?key=${key}`);
  } catch (error) {
    //if fetch error,do nothing,stay in the same page,inform the user the error
    console.log("fetch restaurant list error", error);
    return error.message;
  }
  if (res.data && res.data.length && res.data.length > 0) {
    dispatch({
      type: FETCH_RESTAURANT_LIST,
      payload: res.data
    });
    return;
  }
  //if there is no list found,inform user no result
  return "no list found";
};
export const signUp = userInfo => async dispatch => {
  let res;
  try {
    res = await axiosInstance.post("/auth/signup", userInfo);
  } catch (error) {
    return null; //error has been handled by errorShowModal
  }
  if (res.data.success === true) {
    dispatch({
      type: FETCH_AUTH,
      payload: _.omit(res.data.info, "shoppingCart")
    });
    dispatch({ type: FETCH_SHOPPINGCART, payload: res.data.info.shoppingCart });
  } else dispatch({ type: FETCH_AUTH, payload: false });

  return res;
};
export const signInLocally = userInfo => async dispatch => {
  let res;
  try {
    res = await axiosInstance.post("/auth/local", userInfo, {
      validateStatus: function(status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    });
  } catch (error) {
    return null; //error has been handled by errorShowModal
  }
  if (res.data && res.data.success === true) {
    dispatch({
      type: FETCH_AUTH,
      payload: _.omit(res.data.info, "shoppingCart")
    });
    dispatch({ type: FETCH_SHOPPINGCART, payload: res.data.info.shoppingCart });
  } else dispatch({ type: FETCH_AUTH, payload: false });

  return res;
};
export const fetchUser = () => async dispatch => {
  let res;
  try {
    res = await axiosInstance.get("/auth/current_user");
  } catch (error) {
    console.log("fetchUser error", error);
    dispatch({ type: FETCH_AUTH, payload: false });
    return;
  }
  if (res.data) {
    dispatch({
      type: FETCH_AUTH,
      payload: _.omit(res.data, "shoppingCart")
    });
    dispatch({ type: FETCH_SHOPPINGCART, payload: res.data.shoppingCart });
  } else dispatch({ type: FETCH_AUTH, payload: false });
};
export const addItemToShoppingcart = item => async dispatch => {
  let res;
  try {
    res = await axiosInstance.post("/data/shoppingcart", item);
  } catch (err) {
    return; //err has been handled by axios interceptor
  }
  dispatch({ type: FETCH_SHOPPINGCART, payload: res.data });
};
export const fetchShoppingcart = () => async dispatch => {
  let res;
  try {
    res = await axiosInstance.get("/data/shoppingcart");
  } catch (error) {
    return; //error has been handled by errorShowModal
  }
  dispatch({
    type: FETCH_SHOPPINGCART,
    payload: res.data
  });
};
export const addOrder = order => async dispatch => {
  let res;
  try {
    res = await axiosInstance.post("/data/order", order, {
      validateStatus: function(status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    });
  } catch (error) {
    return null; //error has been handled by errorShowModal
  }
  if (res.status === 200) {
    dispatch({ type: FETCH_AUTH, payload: _.omit(res.data, "shoppingCart") });
    dispatch({ type: FETCH_SHOPPINGCART, payload: res.data.shoppingCart });
  }
  return res;
};
export const fetchOrders = () => async dispatch => {
  let res;
  try {
    res = await axiosInstance.get("/data/order");
  } catch (error) {
    return; //error has been handled by errorShowModal
  }
  dispatch({
    type: FETCH_ORDERS,
    payload: res.data
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
