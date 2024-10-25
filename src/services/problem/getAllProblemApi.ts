import api from "../../config/client.axios.api";

export const getAllProblemApi = async () => {
  const response = await api.get(`/public/problem`);
  return response.data;
};
