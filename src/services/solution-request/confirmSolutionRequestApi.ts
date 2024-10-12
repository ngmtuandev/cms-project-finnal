import api from "../../config/client.axios.api";

export const confirmSolutionRequestApi = async (solution_id: string) => {
  const response = await api.post(
    `/admin/solution-request/confirm?solution_id=${solution_id}`
  );
  return response;
};
