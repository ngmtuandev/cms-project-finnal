import api from "../../config/client.axios.api";

export const deleteMachineApi = async (idMachine: string) => {
  const response = await api.delete(`/admin/machine`, {
    params: { idMachine },
  });
  return response;
};
