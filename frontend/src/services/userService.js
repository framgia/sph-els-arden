import api from "./apis";
import httpService from "./httpService";

export function register(user) {
  return httpService.post(`${api}/register`, {
    first_name: user.first_name.toLowerCase(),
    last_name: user.last_name.toLowerCase(),
    email: user.email.toLowerCase(),
    password: user.password,
  });
}

export function login(user) {
  return httpService.post(`${api}/login`, {
    email: user.email.toLowerCase(),
    password: user.password,
  });
}

export function loggedInUser() {
  const confirmAction = httpService.get(`${api}/user`);
  return confirmAction;
}

export function logout() {
  return httpService.post(`${api}/logout`);
}

export function allUsers() {
  return httpService.get(`${api}/users`);
}
