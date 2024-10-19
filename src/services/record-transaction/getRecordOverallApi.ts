import api from "../../config/client.axios.api";
import { TRecordOverall } from "../../type/TRecordOverall";

export const getRecordOverallApi = async (dataParams?: TRecordOverall) => {
  const response = await api.get(
    `/admin/record-transaction/get-overall-transfer`,
    {
      params: dataParams,
    }
  );
  return response;
};
