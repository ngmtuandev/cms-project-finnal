import { useQuery } from "@tanstack/react-query";
import { getAllSolutionRequestApi } from "../../services";

export const useGetAllSolutionRequest = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-solution-request"],
    queryFn: () => getAllSolutionRequestApi(),
    enabled: true,
  });
  return {
    solutionsRequest: data?.data,
    isLoading,
  };
};
