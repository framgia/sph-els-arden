import api from "./apis";
import httpService from "./httpService";

export function getCategories() {
  return httpService.get(`${api}/lessons/categories`);
}

export function startLesson(category_id) {
  return httpService.post(`${api}/lessons/${category_id}`);
}

export function submitAnswer(id, load) {
  return httpService.post(`${api}/lessons/answer/${id}`, load);
}

export function getResult(id) {
  return httpService.get(`${api}/lessons/${id}/answered`);
}
