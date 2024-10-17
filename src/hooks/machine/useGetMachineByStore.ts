import { useQuery } from "@tanstack/react-query";
import { getMachineByStore } from "../../services";

export const useGetMachineByStore = (storeCode: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-machine-of-store"],
    queryFn: () => getMachineByStore(storeCode),
    enabled: true,
  });
  return {
    machinesOfStore: data?.data,
    isLoading,
  };
};
