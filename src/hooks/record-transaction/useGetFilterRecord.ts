import { useQuery } from "@tanstack/react-query";
import { getAllRecordApi } from "../../services";
import { TFilterRecord } from "../../type/TFilterRecord";
import { useFilterRecordStore } from "../../store";

export const useGetFilterRecord = (paramsFilter?: TFilterRecord) => {
  const {
    page,
    storeCode,
    endDate,
    startDate,
    machineCode,
    typeResult,
    typeTransaction,
  } = useFilterRecordStore();
  const { data, isLoading } = useQuery({
    queryKey: [
      "filter-record",
      page,
      storeCode,
      endDate,
      startDate,
      machineCode,
      typeResult,
      typeTransaction,
    ],
    queryFn: () => getAllRecordApi(paramsFilter),
    enabled: true,
  });
  return {
    records: data?.data,
    isLoading,
  };
};
