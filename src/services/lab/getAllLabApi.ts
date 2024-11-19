import api from "../../config/client.axios.api";

export const getAllLabApi = async () => {
  const response = await api.post(`/lab/find-all`);
  return response.data;
};
