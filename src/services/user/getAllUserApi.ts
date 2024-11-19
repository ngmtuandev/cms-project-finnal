import api from "../../config/client.axios.api";

export const getAllUserApi = async () => {
  const response = await api.post(`/user/find-all`);
  return response.data;
};
