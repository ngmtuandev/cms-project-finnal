import { useQuery } from "@tanstack/react-query";
import { getAllSolutionWithConditionApi } from "../../services";
import { useCommonStore, useConditionSolutionStore } from "../../store";

export const useGetAllSolutionWithCondition = () => {
  const { isActive } = useConditionSolutionStore();
  const { flag } = useCommonStore();
  const { data, isLoading } = useQuery({
    queryKey: ["all-solution-condition", isActive, flag],
    queryFn: () => getAllSolutionWithConditionApi(isActive),
    enabled: true,
  });
  return {
    solutionCondition: data?.data,
    isLoading,
  };
};
