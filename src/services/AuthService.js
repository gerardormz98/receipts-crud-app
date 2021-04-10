import axios from "axios";
import jwt_decode from "jwt-decode";
import { BASE_URL } from "../utils/constants";

const isLoggedIn = () => {
  let token = getUserToken();
  return token && !isExpired(token);
};

const isExpired = token => {
  let exp = jwt_decode(token).exp;
  return Date.now() >= exp * 1000;
};

const getUserInfo = () => {
  let authInfo = localStorage.getItem("auth");
  return authInfo ? JSON.parse(authInfo) : null;
};

const getUserToken = () => {
  let authInfo = localStorage.getItem("auth");
  return authInfo ? JSON.parse(authInfo).token : null;
};

const login = (email, password) => {
  return axios.post(`${BASE_URL}/login`, {
    email,
    password
  });
};

const resetPassword = email => {
  return axios.post(`${BASE_URL}/users/reset?email=${email}`);
};

export default {
  isLoggedIn,
  getUserInfo,
  getUserToken,
  login,
  resetPassword
};
