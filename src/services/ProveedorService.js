import axios from "axios";
import { BASE_URL, GetAuthHeader } from "../utils/constants";

const getProveedores = () => {
  return axios.get(`${BASE_URL}/suppliers`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

const getProveedor = id => {
  return axios.get(`${BASE_URL}/suppliers/${id}`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

const postProveedor = (nombre, telefono) => {
  return axios.post(
    `${BASE_URL}/suppliers`,
    {
      Name: nombre,
      Phone: telefono
    },
    {
      headers: {
        Authorization: GetAuthHeader()
      }
    }
  );
};

const putProveedor = (id, nombre, telefono) => {
  return axios.put(
    `${BASE_URL}/suppliers/${id}`,
    {
      Name: nombre,
      Phone: telefono
    },
    {
      headers: {
        Authorization: GetAuthHeader()
      }
    }
  );
};

const deleteProveedor = id => {
  return axios.delete(`${BASE_URL}/suppliers/${id}`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

export default {
  getProveedores,
  getProveedor,
  postProveedor,
  putProveedor,
  deleteProveedor
};
