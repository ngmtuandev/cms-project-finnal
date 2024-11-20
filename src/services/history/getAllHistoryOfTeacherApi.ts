import api from "../../config/client.axios.api";

export const getAllHistoryOfTeacherApi = async (
  teacherId: any,
  startDate: any,
  endDate: any
) => {
  const response = await api.get(
    `/history/teacher-checkin-checkout-details?teacherId=${teacherId}&startDate=${startDate}&endDate=${endDate}`
  );
  return response.data;
};
