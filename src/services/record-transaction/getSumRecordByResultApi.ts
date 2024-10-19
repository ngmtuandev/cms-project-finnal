import api from "../../config/client.axios.api";
import { TRecordSumByResult } from "../../type/TRecordSumByResult";

export const getSumRecordByResultApi = async (
  dataParams?: TRecordSumByResult
) => {
  const response = await api.get(
    `/admin/record-transaction/get-sum-by-result`,
    {
      params: dataParams,
    }
  );
  return response;
};
