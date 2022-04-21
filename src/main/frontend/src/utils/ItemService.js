import axios from "axios";
import { ENVIRONMENT } from "../constants";

let API_URL = "";
if (process.env.REACT_APP_API_URL) {
  API_URL = process.env.REACT_APP_API_URL;
} else {
  API_URL = ENVIRONMENT.HOST;
}

export const fetchItems = async (page, size, sort, direction) => {
  const items = await fetch(`${API_URL}/api/v1/items/search?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
  return items.json();
};

export const fetchItemById = async (itemId) => {
  return axios.get(`${API_URL}/api/v1/items/${itemId}`)
  .then((res) => {
    return res.data;
  })
};

export const getRecommendedProducts = async (categoryId, name) => {
  return axios.get(`${API_URL}/api/v1/items/recommended/${categoryId}/${name}`)
  .then((res) => {
    return res.data;
  })
};

export const addItem = async (token, name, description, price, categoryId, subcategoryId, photos, quantity, sellerId, dateAdded, addressId, city, zipCode, state, country ) => {
  return axios.post(`${API_URL}/api/v1/items/add`, {
    name,
    description,
    price,
    categoryId,
    subcategoryId,
    photos,
    quantity,
    sellerId, 
    dateAdded,
    addressId,
    city,
    zipCode,
    state,
    country
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
