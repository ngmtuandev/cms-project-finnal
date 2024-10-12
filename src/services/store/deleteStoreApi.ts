import api from "../../config/client.axios.api";

export const deleteStoreApi = async (idStore: string) => {
  const response = await api.delete(`/admin/store`, {
    params: {
      idStore,
    },
  });
  return response;
};
