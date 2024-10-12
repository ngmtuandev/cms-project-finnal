import api from "../../config/client.axios.api";

export const getAllRoleApi = async () => {
  const response = await api.get(`/admin/role`);
  return response;
};
