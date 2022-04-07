import axios from "axios";
import { ENVIRONMENT } from "../constants";

let API_URL = "";
if (process.env.REACT_APP_API_URL) {
  API_URL = `${process.env.REACT_APP_API_URL}/api/v1/auth/`;
} else {
  API_URL = `${ENVIRONMENT.HOST}/api/v1/auth/`;
}

const register = (name, email, password, phone) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
    phone,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.clear();
  window.location.replace("/home");
};

const getCurrentUser = () => {
  if (!!localStorage.getItem("updatedUser")) {
    return JSON.parse(localStorage.getItem("updatedUser"));
  }
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser
};
