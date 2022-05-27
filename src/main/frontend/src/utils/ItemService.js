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

export const fetchFilteredItems = async (search, page, size, sort, direction, categoryIds, subcategoryIds, minPrice, maxPrice) => {
  const items = await fetch(`${API_URL}/api/v1/items/filtered?search=${search}&page=${page}&size=${size}&sort=${sort}&direction=${direction}&categoryIds=${categoryIds}&subcategoryIds=${subcategoryIds}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
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

export const fetchItemsBySellerId = async (sellerId) => {
  return axios.get(`${API_URL}/api/v1/items/user/${sellerId}`)
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

export const fetchAllCategories = async () => {
  return axios.get(`${API_URL}/api/v1/categories/all`)
  .then((res) => {
    return res.data;
  })
};

export const getSearchSuggestions = async (searchText) => {
  return axios.get(`${API_URL}/api/v1/items/suggestions/${searchText}`)
  .then((res) => {
    return res.data;
  })
};

export const updateItem = async (id, price, quantity) => {
  return axios.put(`${API_URL}/api/v1/items/update`, {
    id,
    price,
    quantity})
  .then((res) => {
    return res.data;
  })
};

export const deleteItem = async (itemId) => {
  return axios.put(`${API_URL}/api/v1/items/delete/${itemId}`)
  .then((res) => {
    return res.data;
  })
};
