import api from "../../config/client.axios.api";

export const createNewTeacherApi = async (createUserInfo: any) => {
  const response = await api.post(`/user/create`, createUserInfo);
  return response.data;
};
