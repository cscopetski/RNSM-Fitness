import { getDate } from "./Date.js";
import { axiosPost, axiosGet } from "../modules/req.js";

export async function getUser() {
  return await axiosGet("api/users/get");
}

export async function getProfile(userId) {
  return await axiosGet("api/profiles/get/" + userId);
}

export async function getHealthProfile() {
  return await axiosGet("api/health-profile/get");
}

export async function getDailyLog(date = getDate()) {
  return await axiosGet("api/daily-log/get/" + date);
}

export async function updateDailyLog(data = {}, date = getDate()) {
  data.date = date;

  return await axiosPost("api/daily-log/update", data);
}

export async function changeEmail(data = {}) {
  return await axiosPost("api/users/change-email", data);
}

export async function updateHealthProfile(data = {}) {
  return await axiosPost("api/health-profile/update", data);
}

export async function updateUser(data = {}) {
  return await axiosPost("api/users/update", data);
}

export async function changePassword(data = {}) {
  return await axiosPost("api/users/change-password", data);
}

export async function changeProfilePicture(data = {}) {
  return await axiosPost("api/profiles/changepfp", data);
}

export async function changeProfileDescription(data = {}) {
  return await axiosPost("api/profiles/change-description", data);
}

export async function sendForgotPasswordEmail(data = {}) {
  return await axiosPost("api/users/forgot", data);
}
