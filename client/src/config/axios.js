import axios from "axios";
import { getAccessTokenLS } from "@utils/tokenLocalStorage";
import { logout } from "@utils/auth";

/*************** Default Client ***************/
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_HOST,
});
export default axiosClient;

/*************** Interceptors ***************/
// inject access token
export const initAxiosInterceptors = () => {
  axiosClient.interceptors.request.use(function (config) {
    const accessToken = getAccessTokenLS();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  // If an error exists
  axiosClient.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (
        error.response.status === 401 &&
        (error.response.data.msg === "Invalid token." ||
          error.response.data.msg === "Token is required.")
      ) {
        logout();
      } else {
        return Promise.reject(error);
      }
    }
  );
};
