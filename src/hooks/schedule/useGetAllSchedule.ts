import { useQuery } from "@tanstack/react-query";
import { getAllScheduleOfTeacherApi } from "../../services";
import { useScheduleStore } from "../../store";

export const useGetAllSchedule = () => {
  const { endDate, startDate, teacherId } = useScheduleStore();
  const { data, isLoading } = useQuery({
    queryKey: ["schedule", startDate, endDate, teacherId],
    queryFn: () => getAllScheduleOfTeacherApi(teacherId, startDate, endDate),
    enabled: true,
  });
  return {
    schedule: data?.data,
    isLoading,
  };
};
