import AuthService from "./services/AuthService";

export const BASE_URL = "https://simple-crud-web-api.azurewebsites.net/api";
export const DEFAULT_ERROR =
  "Ha ocurrido un error al intentar conectarse al servidor.";

export const GetAuthHeader = () => {
  return "Bearer " + AuthService.getUserToken();
};
