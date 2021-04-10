import axios from "axios";
import { BASE_URL, GetAuthHeader } from "../utils/constants";

const getUsuarios = () => {
  return axios.get(`${BASE_URL}/users`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

const getUsuario = id => {
  return axios.get(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

const postUsuario = (email, password, isAdmin) => {
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

const putUsuario = (id, esAdmin) => {
  return axios.put(
    `${BASE_URL}/users/${id}`,
    {
      esAdmin
    },
    {
      headers: {
        Authorization: GetAuthHeader()
      }
    }
  );
};

const deleteUsuario = id => {
  return axios.delete(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

export default {
  getUsuario,
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsuario
};
