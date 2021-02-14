import axiosClient from "@config/axios";
import { setUserLS, getUserLS, deleteUserLS } from "./userLocalStorage";
import { setTokenLS, deleteTokenLS } from "./tokenLocalStorage";

export const fetchCurrentUser = async () => {
  try {
    const response = await axiosClient.get("auth/whoami/");
    const results = response.data.results[0];
    setUserLS(results.user);
    setTokenLS(results.token);
    return results.user;
  } catch (error) {
    console.error(error);
   }
};

export const isLogin = () => {
  const user = getUserLS();
  if (user) {
    fetchCurrentUser();
    return true;
  }
  return false;
};

export const logout = () => {
  deleteTokenLS();
  deleteUserLS();
  window.location = "/login";
};
