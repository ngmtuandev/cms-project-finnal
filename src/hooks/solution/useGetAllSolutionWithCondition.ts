import { useQuery } from "@tanstack/react-query";
import { getAllSolutionWithConditionApi } from "../../services";
import { useConditionSolutionStore } from "../../store";

export const useGetAllSolutionWithCondition = () => {
  const { isActive } = useConditionSolutionStore();
  const { data, isLoading } = useQuery({
    queryKey: ["all-solution-condition", isActive],
    queryFn: () => getAllSolutionWithConditionApi(isActive),
    enabled: true,
  });
  return {
    solutionCondition: data?.data,
    isLoading,
  };
};
