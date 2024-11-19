import api from "../../config/client.axios.api";

export const getAllScheduleOfTeacherApi = async (
  teacherId: any,
  startDate: any,
  endDate: any
) => {
  const response = await api.get(
    `/user/schedule?teacherId=${teacherId}&startDate=${startDate}&endDate=${endDate}&isActive=true`
  );
  return response;
};
