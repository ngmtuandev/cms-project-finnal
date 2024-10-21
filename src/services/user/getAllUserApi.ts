import api from "../../config/client.axios.api";

export const getAllUserApi = async (pagination: any) => {
  const response = await api.get(`/public/user`, {
    params: {
      ...pagination,
    },
  });
  return response.data;
};
