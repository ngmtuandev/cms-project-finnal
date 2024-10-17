import api from "../../config/client.axios.api";

export const getAllSolutionWithConditionApi = async (isActive: boolean) => {
  const response = await api.get(`/public/solution/find-with-condition`, {
    params: { isActive },
  });
  return response.data;
};
