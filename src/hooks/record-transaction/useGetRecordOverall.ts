import { useQuery } from "@tanstack/react-query";
import { getRecordOverallApi } from "../../services";
import { useOverallRecordStore } from "../../store";

export const useGetRecordOverall = () => {
  const { startDate, endDate, typeTransaction } = useOverallRecordStore();
  const { data, isLoading } = useQuery({
    queryKey: [startDate, endDate, typeTransaction],
    queryFn: () =>
      getRecordOverallApi({
        startDate,
        endDate,
        typeTransaction,
      }),
    enabled: true,
  });
  return {
    overallRecord: data?.data?.data,
    isLoading,
  };
};
