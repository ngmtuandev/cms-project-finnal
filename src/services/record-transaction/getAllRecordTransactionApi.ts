import api from "../../config/client.axios.api";
import { TFilterRecord } from "../../type/TFilterRecord";

export const getAllRecordApi = async (paramsFilter?: TFilterRecord) => {
  const response = await api.get(`/admin/record-transaction/filter`, {
    params: paramsFilter,
  });
  return response;
};
