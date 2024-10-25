import { useQuery } from "@tanstack/react-query";
import { getAllResultsByProblem } from "../../services";
import { useProblemStore } from "../../store";

export const useGetAllResultByProblem = () => {
  const { problemId } = useProblemStore();
  const { data, isLoading } = useQuery({
    queryKey: ["all-results", problemId],
    queryFn: () => getAllResultsByProblem(problemId),
    enabled: true,
  });
  return {
    results: data?.data,
    isLoading,
  };
};
