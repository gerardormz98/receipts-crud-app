import axios from "axios";
import { BASE_URL, GetAuthHeader } from "../utils/constants";

const getSuppliers = () => {
  return axios.get(`${BASE_URL}/suppliers`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

const getSupplier = id => {
  return axios.get(`${BASE_URL}/suppliers/${id}`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

const postSupplier = (nombre, telefono) => {
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

const putSupplier = (id, nombre, telefono) => {
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

const deleteSupplier = id => {
  return axios.delete(`${BASE_URL}/suppliers/${id}`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

export default {
  getSuppliers,
  getSupplier,
  postSupplier,
  putSupplier,
  deleteSupplier
};
