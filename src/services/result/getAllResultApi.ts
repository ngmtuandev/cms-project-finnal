import api from "../../config/client.axios.api";

export const getAllResultApi = async () => {
  const response = await api.get(`/public/results`);
  return response.data;
};
