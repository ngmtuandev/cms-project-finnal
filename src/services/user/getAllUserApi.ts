import api from "../../config/client.axios.api";

export const getAllUserApi = async (storeCode: string) => {
  const response = await api.get(`/admin/user/find-user-by-store-code`, {
    params: {
      storeCode,
    },
  });
  return response.data;
};
