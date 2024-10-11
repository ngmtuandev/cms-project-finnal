import { useQuery } from "@tanstack/react-query";
import { getAllStoreApi } from "../../services";

export const useGetAllStore = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-store"],
    queryFn: () => getAllStoreApi(),
    enabled: true,
  });
  return {
    stores: data?.data,
    isLoading,
  };
};
