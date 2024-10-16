import api from "../../config/client.axios.api";
import { TParamsAnalysisWithResult } from "../../type/TParamsAnalysisWithResult";

export const getAnalysisWithResultApi = async ({
  startDate,
  endDate,
}: TParamsAnalysisWithResult) => {
  const response = await api.get(`/admin/record-transaction/get-analysis`, {
    params: {
      startDate,
      endDate,
    },
  });
  return response;
};
