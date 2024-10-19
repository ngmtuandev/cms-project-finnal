import { useQuery } from "@tanstack/react-query";
import { getForDashboardErrorApi } from "../../services";
import { useDashboardRecordStore } from "../../store";

export const useGetRecordForDashboard = () => {
  const { startDate, endDate, typeResult, typeTransaction } =
    useDashboardRecordStore();
  const { data, isLoading } = useQuery({
    queryKey: [startDate, endDate, typeResult, typeTransaction],
    queryFn: () =>
      getForDashboardErrorApi({
        startDate,
        endDate,
        typeResult,
        typeTransaction,
      }),
    enabled: true,
  });
  return {
    dashboardErrorRecord: data?.data?.data,
    isLoading,
  };
};
