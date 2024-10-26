import api from "../../config/client.axios.api";

export const getByStoreCodeApi = async (storeCode: any) => {
  const response = await api.get(`/admin/user/find-user-by-store-code`, {
    params: {
      storeCode,
    },
  });
  return response.data;
};
