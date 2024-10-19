import { useQuery } from "@tanstack/react-query";
import { getForDashboardTransferApi } from "../../services";
import { useDashboardRecordTransferStore } from "../../store";

export const useGetRecordForDashboardTransfer = () => {
  const { startDate2, endDate2, typeTransaction } =
    useDashboardRecordTransferStore();
  const { data, isLoading } = useQuery({
    queryKey: [startDate2, endDate2, typeTransaction],
    queryFn: () =>
      getForDashboardTransferApi({
        startDate: startDate2,
        endDate: endDate2,
        typeTransaction,
      }),
    enabled: true,
  });
  return {
    dashboardTransferRecord: data?.data?.data,
    isLoading,
  };
};
