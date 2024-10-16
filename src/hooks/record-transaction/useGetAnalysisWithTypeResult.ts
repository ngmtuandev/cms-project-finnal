import { useQuery } from "@tanstack/react-query";
import { getAnalysisWithResultApi } from "../../services";
import { useFilterRecordStore } from "../../store";

export const useGetAnalysisWithTypeResult = () => {
  const { startDate, endDate } = useFilterRecordStore();
  console.log("🚀 ~ useGetAnalysisWithTypeResult ~ endDate:", endDate);
  console.log("🚀 ~ useGetAnalysisWithTypeResult ~ startDate:", startDate);
  const { data, isLoading } = useQuery({
    queryKey: ["analysis-record", startDate, endDate],
    queryFn: () => getAnalysisWithResultApi({ startDate, endDate }),
    enabled: true,
  });
  return {
    analysisRecord: data?.data,
    isLoading,
  };
};
