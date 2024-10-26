import { useQuery } from "@tanstack/react-query";
import { getAllUserApi } from "../../services";

export const useGetAllUser = (storeCode: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-user", storeCode],
    queryFn: () => getAllUserApi(storeCode),
    enabled: true,
  });
  return {
    info: data?.data,
    isLoading,
  };
};
