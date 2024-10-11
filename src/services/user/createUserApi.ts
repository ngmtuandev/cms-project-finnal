import api from "../../config/client.axios.api";
import { TCreateUser } from "../../type/TCreateUser";

export const createUserApi = async (createUserInfo?: TCreateUser) => {
  const response = await api.post(`/admin/user`, createUserInfo);
  return response;
};
