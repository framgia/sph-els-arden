import api from "./apis";
import httpService from "./httpService";

export function update(user) {
  return httpService.patch(`${api}/profiles/updateProfile/${user.profile_id}`, {
    user_id: user.user_id,
    user: {
      first_name: user.first_name.toLowerCase(),
      last_name: user.last_name.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
    },
  });
}

export function getCurrentProfile() {
  return httpService.get(`${api}/profiles/profile`);
}

export function uploadAvatar(user, formData) {
  return httpService.post(
    `${api}/profiles/uploadAvatar/${user.profile_id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
