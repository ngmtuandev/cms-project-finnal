import { useQuery } from "@tanstack/react-query";
import { getAllUserApi } from "../../services";

export const useGetAllUser = (pagination: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-user"],
    queryFn: () => getAllUserApi(pagination),
    enabled: true,
  });
  return {
    info: data?.data,
    isLoading,
  };
};
