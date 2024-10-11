import api from "../../config/client.axios.api";

export const getAllStoreApi = async () => {
  const response = await api.get(`/admin/store`);
  return response.data;
};
