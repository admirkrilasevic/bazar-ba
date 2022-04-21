import axios from "axios";
import { ENVIRONMENT } from "../constants";

let API_URL = "";
if (process.env.REACT_APP_API_URL) {
  API_URL = process.env.REACT_APP_API_URL;
} else {
  API_URL = ENVIRONMENT.HOST;
}

export const fetchAddressById = async (addressId) => {
  const address = await fetch(`${API_URL}/api/v1/addresses/${addressId}`);
  return address.json();
};