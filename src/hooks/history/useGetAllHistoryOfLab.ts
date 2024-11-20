import { useQuery } from "@tanstack/react-query";
import { getAllHistoryOfLabApi } from "../../services";
import { useHistoryOfLabStore } from "../../store";

export const useGetAllHistoryOfLab = () => {
  const { endDate, labId, startDate } = useHistoryOfLabStore();
  const { data, isLoading } = useQuery({
    queryKey: ["history-lab", startDate, endDate, labId],
    queryFn: () => getAllHistoryOfLabApi(labId, startDate, endDate),
    enabled: true,
  });
  return {
    historyLab: data,
    isLoading,
  };
};
