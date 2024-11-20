import api from "../../config/client.axios.api";

export const getAllHistoryOfLabApi = async (
  labId: any,
  startDate: any,
  endDate: any
) => {
  const response = await api.get(
    `/history/lab-details?labId=${labId}&startDate=${startDate}&endDate=${endDate}`
  );
  return response.data;
};
