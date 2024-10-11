import { useQuery } from "@tanstack/react-query";
import { getAllSolutionApi } from "../../services";

export const useGetAllSolution = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-solution"],
    queryFn: () => getAllSolutionApi(),
    enabled: true,
  });
  return {
    solutions: data?.data,
    isLoading,
  };
};
