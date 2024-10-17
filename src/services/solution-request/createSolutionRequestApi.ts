import api from "../../config/client.axios.api";
import { TCreateSolution } from "../../type/TCreateSolution";

export const createSolutionRequestApi = async (
  createSolution?: TCreateSolution
) => {
  const response = await api.post(`/admin/solution`, {
    ...createSolution,
    isActive: false,
  });
  return response;
};
