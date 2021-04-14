import axios from "axios";
import { BASE_URL, GetAuthHeader } from "../utils/constants";

const getUsers = () => {
  return axios.get(`${BASE_URL}/users`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

const getUser = id => {
  return axios.get(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

const postUser = (email, password, isAdmin) => {
  return axios.post(
    `${BASE_URL}/users`,
    {
      email,
      password,
      isAdmin
    },
    {
      headers: {
        Authorization: GetAuthHeader()
      }
    }
  );
};

const putUser = (id, isAdmin) => {
  return axios.put(
    `${BASE_URL}/users/${id}`,
    {
      isAdmin
    },
    {
      headers: {
        Authorization: GetAuthHeader()
      }
    }
  );
};

const deleteUser = id => {
  return axios.delete(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

export default {
  getUser,
  getUsers,
  postUser,
  putUser,
  deleteUser
};
