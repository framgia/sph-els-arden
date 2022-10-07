import api from "./apis";
import httpService from "./httpService";

export function getUser(id) {
  return httpService.get(`${api}/activities/${id}`);
}

export function getAllUsers() {
  return httpService.get(`${api}/activities`);
}
