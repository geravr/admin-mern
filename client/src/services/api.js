// Axios
import axiosClient from "@config/axios";

// Utils
import { setUserLS } from "@utils/userLocalStorage";
import { setTokenLS } from "@utils/tokenLocalStorage";

/*************** Authentication ***************/
export const loginUser = async (credentials) => {
  const response = await axiosClient.post("auth/obtain/", credentials);
  const { token, ...rest } = response.data;
  setTokenLS(token);
  setUserLS(rest);
};

/*************** Users ***************/
export const createUser = async (user) =>
  await axiosClient.post("users/", user);

export const updateUser = async (id, newData) =>
  await axiosClient.patch(`users/${id}/`, newData);

export const deleteUser = async (id) =>
  await axiosClient.delete(`users/${id}/`);

/*************** Groups ***************/
export const createGroup = async (group) =>
  await axiosClient.post("groups/", group);

export const updateGroup = async (id, newData) =>
  await axiosClient.patch(`groups/${id}/`, newData);

export const deleteGroup = async (id) =>
  await axiosClient.delete(`groups/${id}/`);
