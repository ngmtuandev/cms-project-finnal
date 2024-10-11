import { useQuery } from "@tanstack/react-query";
import { getAllUserApi } from "../../services";

export const useGetAllUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-user"],
    queryFn: () => getAllUserApi(),
    enabled: true,
  });
  return {
    info: data?.data,
    isLoading,
  };
};
