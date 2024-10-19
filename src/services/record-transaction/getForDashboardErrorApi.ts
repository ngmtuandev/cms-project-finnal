import api from "../../config/client.axios.api";
import { TRecordDashboard } from "../../type/TRecordDashboard";

export const getForDashboardErrorApi = async (
  dataParams?: TRecordDashboard
) => {
  const response = await api.get(
    `/admin/record-transaction/get-for-dashboard-error`,
    {
      params: dataParams,
    }
  );
  return response;
};
