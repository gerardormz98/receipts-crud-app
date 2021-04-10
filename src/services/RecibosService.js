import axios from "axios";
import { BASE_URL, GetAuthHeader } from "../constants";

const getRecibos = () => {
  return axios.get(`${BASE_URL}/receipts`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

const getRecibo = id => {
  return axios.get(`${BASE_URL}/receipts/${id}`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

const postRecibo = (idProveedor, monto, comentario) => {
  return axios.post(
    `${BASE_URL}/receipts`,
    {
      SupplierID: idProveedor,
      Amount: monto,
      Comments: comentario
    },
    {
      headers: {
        Authorization: GetAuthHeader()
      }
    }
  );
};

const putRecibo = (id, idProveedor, monto, comentario) => {
  return axios.put(
    `${BASE_URL}/receipts/${id}`,
    {
      SupplierID: idProveedor,
      Amount: monto,
      Comments: comentario
    },
    {
      headers: {
        Authorization: GetAuthHeader()
      }
    }
  );
};

const deleteRecibo = id => {
  return axios.delete(`${BASE_URL}/receipts/${id}`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

export default {
  getRecibos,
  getRecibo,
  postRecibo,
  putRecibo,
  deleteRecibo
};
