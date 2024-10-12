import api from "../../config/client.axios.api";

export const updateSolutionApi = async (updateInfo: any) => {
  const response = await api.put(`/admin/solution`, updateInfo);
  return response;
};
