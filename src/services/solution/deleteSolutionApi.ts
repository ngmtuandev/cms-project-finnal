import api from "../../config/client.axios.api";

export const deleteSolutionApi = async (solution_id: string) => {
  const response = await api.delete(`/admin/solution`, {
    params: {
      solution_id,
    },
  });
  return response;
};
