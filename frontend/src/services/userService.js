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
