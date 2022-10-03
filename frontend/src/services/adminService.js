import api from "./apis";
import httpService from "./httpService";

export function getCategories() {
  return httpService.get(`${api}/admin/categories`);
}

export function deleteCategory(id) {
  return httpService.delete(`${api}/admin/category/${id}`);
}

export function editCategory(load) {
  return httpService.patch(`${api}/admin/category/${load.id}`, load);
}

export function getCategory(id) {
  return httpService.get(`${api}/admin/category/${id}`);
}

export function addCategory(load) {
  return httpService.post(`${api}/admin/categories`, load);
}
