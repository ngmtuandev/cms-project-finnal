import { useQuery } from "@tanstack/react-query";
import { getAllHistoryOfTeacherApi } from "../../services";
import { useHistoryOfTeacherStore } from "../../store";

export const useGetAllHistoryOfTeacher = () => {
  const { endDate, teacherId, startDate } = useHistoryOfTeacherStore();
  const { data, isLoading } = useQuery({
    queryKey: ["history-teacher", teacherId, startDate, endDate],
    queryFn: () => getAllHistoryOfTeacherApi(teacherId, startDate, endDate),
    enabled: true,
  });
  return {
    historyTeacher: data,
    isLoading,
  };
};
