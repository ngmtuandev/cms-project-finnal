import api from "../../config/client.axios.api";

export const getAllMachineApi = async () => {
  const response = await api.get(`/public/machine`);
  return response.data;
};
