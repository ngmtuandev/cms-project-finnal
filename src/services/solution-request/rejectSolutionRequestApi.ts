import api from "../../config/client.axios.api";

export const rejectSolutionRequestApi = async (solution_id: string) => {
  const response = await api.delete(
    `/admin/solution?solution_id=${solution_id}`
  );
  return response;
};
