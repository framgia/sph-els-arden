import api from "./apis";
import httpService from "./httpService";

export function getCategories() {
  return httpService.get(`${api}/lessons/categories`);
}
