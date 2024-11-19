import api from "../../config/client.axios.api";
import { TCreateSchedule } from "../../type/TCreateSchedule";

export const createScheduleApi = async (
  createScheduleInfo?: TCreateSchedule
) => {
  const response = await api.post(
    `/schedule/create-schedule`,
    createScheduleInfo
  );
  return response;
};
