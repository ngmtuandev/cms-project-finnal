import api from "../../config/client.axios.api";
import { TCreateProblem } from "../../type/TCreateProblem";

export const createProblemApi = async (createProblemInfo?: TCreateProblem) => {
  const response = await api.post(`/admin/problem`, createProblemInfo);
  return response;
};
