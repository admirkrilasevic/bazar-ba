import { ENVIRONMENT } from "../constants";
import axios from "axios";

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
