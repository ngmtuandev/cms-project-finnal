import { useQuery } from "@tanstack/react-query";
import { getAllLabApi } from "../../services";

export const useGetAllLab = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["labs"],
    queryFn: () => getAllLabApi(),
    enabled: true,
  });
  return {
    labs: data?.data,
    isLoading,
  };
};
