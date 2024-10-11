import api from "../../config/client.axios.api";
import { TCreateSolution } from "../../type/TCreateSolution";

export const createSolutionApi = async (
  createSolutionInfo?: TCreateSolution
) => {
  const response = await api.post(`/admin/solution`, createSolutionInfo);
  return response;
};
