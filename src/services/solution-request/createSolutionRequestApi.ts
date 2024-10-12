import api from "../../config/client.axios.api";
import { TCreateSolution } from "../../type/TCreateSolution";

export const createSolutionRequestApi = async (
  createSolution?: TCreateSolution
) => {
  const response = await api.post(`/public/solution-request`, createSolution);
  return response;
};
