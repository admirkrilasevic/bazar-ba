import { ENVIRONMENT } from "../constants";

let API_URL = "";
if (process.env.REACT_APP_API_URL) {
  API_URL = process.env.REACT_APP_API_URL;
} else {
  API_URL = ENVIRONMENT.HOST;
}

export const fetchMostPopularCategories = async () => {
  const items = await fetch(`${API_URL}/api/v1/categories/popular`);
  return items.json();
};
