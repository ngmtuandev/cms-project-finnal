import api from "../../config/client.axios.api";
import { TRecordDashboard } from "../../type/TRecordDashboard";

export const getForDashboardTransferApi = async (
  dataParams?: TRecordDashboard
) => {
  const response = await api.get(
    `/admin/record-transaction/get-for-dashboard-transfer`,
    {
      params: dataParams,
    }
  );
  return response;
};
