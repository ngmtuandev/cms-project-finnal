import api from "../../config/client.axios.api";
import { TUpdateStore } from "../../type/TUpdateStore";

export const updateStoreApi = async (updateInfo: TUpdateStore) => {
  const response = await api.put(`/admin/store`, updateInfo);
  return response;
};
