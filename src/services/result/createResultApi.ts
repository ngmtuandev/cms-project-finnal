import api from "../../config/client.axios.api";
import { TCreateResult } from "../../type/TCreateResult";

export const createResultApi = async (createResultInfo?: TCreateResult) => {
  const response = await api.post(`/admin/result`, createResultInfo);
  return response;
};
