import api from "../../config/client.axios.api";

export const getAllSolutionApi = async () => {
  const response = await api.get(`/public/solution`);
  return response.data;
};
