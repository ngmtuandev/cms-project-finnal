import { useQuery } from "@tanstack/react-query";
import { getAllProblemApi } from "../../services";

export const useGetAllProblem = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-problem"],
    queryFn: () => getAllProblemApi(),
    enabled: true,
  });
  return {
    problem: data?.data,
    isLoading,
  };
};
