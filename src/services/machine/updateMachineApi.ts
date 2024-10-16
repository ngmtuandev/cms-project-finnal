import api from "../../config/client.axios.api";
import { TUpdateMachine } from "../../type/TUpdateMachine";

export const updateMachineApi = async (updateInfo: TUpdateMachine) => {
  const response = await api.put(`/admin/machine`, updateInfo);
  return response;
};
