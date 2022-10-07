import api from "./apis";
import httpService from "./httpService";

export function update(user) {
  return httpService.patch(`${api}/profiles/updateProfile/${user.id}`, {
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
  return httpService.post(`${api}/profiles/uploadAvatar/${user.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getFollowers(id) {
  return httpService.get(`${api}/follows/followers/${id}`);
}

export function getFollowings(id) {
  return httpService.get(`${api}/follows/followings/${id}`);
}

export function unfollow(id) {
  return httpService.delete(`${api}/follows/${id}/delete`);
}

export function follow(id) {
  return httpService.post(`${api}/follows/${id}/create`);
}

export function getOtherProfile(id) {
  return httpService.get(`${api}/profiles/profile/${id}`);
}

export function getProfilePageData(id) {
  return httpService.get(`${api}/profiles/data/${id}`);
}

export function getLearnedWords(id) {
  return httpService.get(`${api}/profiles/${id}/words`);
}
