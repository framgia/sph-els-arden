import api from "./apis";
import httpService from "./httpService";

export function getActivities(id) {
  return httpService.get(`${api}/activities/${id}`);
}

export function getAllActivities() {
  return httpService.get(`${api}/activities`);
}
