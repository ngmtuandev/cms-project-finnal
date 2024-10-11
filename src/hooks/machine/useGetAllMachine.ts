import { useQuery } from "@tanstack/react-query";
import { getAllMachineApi } from "../../services";

export const useGetAllMachine = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-machine"],
    queryFn: () => getAllMachineApi(),
    enabled: true,
  });
  return {
    machines: data?.data,
    isLoading,
  };
};
