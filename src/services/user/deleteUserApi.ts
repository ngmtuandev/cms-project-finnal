import api from "../../config/client.axios.api";

export const deleteUserApi = async (idUser: string) => {
  const response = await api.delete(`/admin/user?idUser=${idUser}`);
  return response;
};
