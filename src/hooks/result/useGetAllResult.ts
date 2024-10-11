import { useQuery } from "@tanstack/react-query";
import { getAllResultApi } from "../../services";

export const useGetAllResult = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-result"],
    queryFn: () => getAllResultApi(),
    enabled: true,
  });
  return {
    results: data?.data,
    isLoading,
  };
};
