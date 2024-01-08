import { SERVER_URL } from "../../variable/URL";
import axios from "axios";

export const getServicesAPI = async () =>
  (await axios.get(SERVER_URL + `service/`)).data;

export const postServiceAPI = async (name) =>
  await axios.post(SERVER_URL + `service/`, {
    name: name,
  });

export const putServiceAPI = async (selected, name) =>
  await axios.put(SERVER_URL + `service/${selected}`, {
    name: name,
  });

export const deleteServiceAPI = async (selected) =>
  await axios.delete(SERVER_URL + `service/${selected}`);
