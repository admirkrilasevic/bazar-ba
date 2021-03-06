import axios from "axios";
import { ENVIRONMENT } from "../constants";

let API_URL = "";
if (process.env.REACT_APP_API_URL) {
  API_URL = process.env.REACT_APP_API_URL;
} else {
  API_URL = ENVIRONMENT.HOST;
}

export const addOrder = async (token, buyerId, buyerAddressId, totalAmount, paymentMethod) => {
  return axios.post(`${API_URL}/api/v1/orders/addOrder`, {
    buyerId,
    buyerAddressId,
    totalAmount,
    paymentMethod
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    return error.response;
  });
}

export const addOrderDetail = async (token, orderId, itemId, price, quantity) => {
  return axios.post(`${API_URL}/api/v1/orders/addOrderDetail`, {
    orderId, 
    itemId,
    price,
    quantity
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    return error.response;
  });
}

export const fetchOrderDetailsByItemId = async (token, itemId) => {
  return axios.get(`${API_URL}/api/v1/orders/getOrderDetailsByItemId/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  .then((res) => {
    return res.data;
  })
};

export const fetchOrdersByBuyerId = async (token, buyerId) => {
  return axios.get(`${API_URL}/api/v1/orders/getOrdersByBuyerId/${buyerId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  .then((res) => {
    return res.data;
  })
};

export const updateOrderStatus = async (token, orderId, status) => {
  return axios.put(`${API_URL}/api/v1/orders/updateOrderStatus/${orderId}/${status}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    return error.response;
  });
}
  