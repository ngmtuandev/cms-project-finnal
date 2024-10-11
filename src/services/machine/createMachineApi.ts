import api from "../../config/client.axios.api";
import { TCreateMachine } from "../../type/TCreateMachine";

export const createMachineApi = async (createMachineInfo?: TCreateMachine) => {
  const response = await api.post(`/admin/machine`, createMachineInfo);
  return response;
};
