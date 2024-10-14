import api from "../../config/client.axios.api";

export const getAllSolutionRequestApi = async () => {
  const response = await api.get(`/admin/solution-request`);
  return response.data;
};
0;
