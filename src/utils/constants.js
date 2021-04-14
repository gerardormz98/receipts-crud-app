import AuthService from "../services/AuthService";

export const BASE_URL = "https://simple-crud-web-api.azurewebsites.net/api";
export const DEFAULT_ERROR = "An error has ocurred while connecting to the server.";

export const GetAuthHeader = () => {
  return "Bearer " + AuthService.getUserToken();
};
