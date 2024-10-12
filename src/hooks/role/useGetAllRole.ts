import { useQuery } from "@tanstack/react-query";
import { getAllRoleApi } from "../../services";

export const useGetAllRole = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-role"],
    queryFn: () => getAllRoleApi(),
    enabled: true,
  });
  return {
    roles: data?.data,
    isLoading,
  };
};
