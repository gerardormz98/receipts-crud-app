import axios from "axios";
import { BASE_URL, GetAuthHeader } from "../utils/constants";

const getReceipts = () => {
  return axios.get(`${BASE_URL}/receipts`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

const getReceipt = id => {
  return axios.get(`${BASE_URL}/receipts/${id}`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

const postReceipt = (supplierID, amount, comments) => {
  return axios.post(
    `${BASE_URL}/receipts`,
    {
      SupplierID: supplierID,
      Amount: amount,
      Comments: comments
    },
    {
      headers: {
        Authorization: GetAuthHeader()
      }
    }
  );
};

const putReceipt = (id, supplierID, amount, comments) => {
  return axios.put(
    `${BASE_URL}/receipts/${id}`,
    {
      SupplierID: supplierID,
      Amount: amount,
      Comments: comments
    },
    {
      headers: {
        Authorization: GetAuthHeader()
      }
    }
  );
};

const deleteReceipt = id => {
  return axios.delete(`${BASE_URL}/receipts/${id}`, {
    headers: {
      Authorization: GetAuthHeader()
    }
  });
};

const service = {
  getReceipts,
  getReceipt,
  postReceipt,
  putReceipt,
  deleteReceipt
};

export default service;