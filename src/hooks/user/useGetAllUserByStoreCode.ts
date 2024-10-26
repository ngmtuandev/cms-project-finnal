import { useQuery } from "@tanstack/react-query";
import { getByStoreCodeApi } from "../../services";

export const useGetAllUserByStoreCode = (storeCode: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-user"],
    queryFn: () => getByStoreCodeApi(storeCode),
    enabled: true,
  });
  return {
    info: data?.data,
    isLoading,
  };
};
