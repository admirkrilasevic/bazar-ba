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
  