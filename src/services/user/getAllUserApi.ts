import api from "../../config/client.axios.api";

export const getAllUserApi = async () => {
  const response = await api.get(`/public/user`);
  return response.data;
};
