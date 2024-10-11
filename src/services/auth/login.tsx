import api from "../../config/client.axios.api";

export const apiLogin = async (loginInfo: any) => {
  const response = await api.post(`/public/user`, loginInfo);
  return response.data;
};
