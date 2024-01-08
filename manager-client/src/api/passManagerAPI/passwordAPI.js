import { SERVER_URL } from "../../variable/URL";
import axios from "axios";

export const getPasswordsAPI = async (serviceId) =>
  (await axios.get(SERVER_URL + `password/${serviceId}`)).data;

export const postPasswordAPI = async (
  login,
  password,
  description,
  serviceId,
) =>
  await axios.post(SERVER_URL + `password/`, {
    login: login,
    password: password,
    description: description,
    serviceId: serviceId,
  });

export const putPasswordAPI = async (
  login,
  password,
  description,
  passwordId,
) =>
  await axios.put(SERVER_URL + `password/${passwordId}`, {
    login: login,
    password: password,
    description: description,
  });

export const deletePasswordAPI = async (passwordId) =>
  await axios.delete(SERVER_URL + `password/${passwordId}`);
