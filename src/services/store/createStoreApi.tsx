import api from "../../config/client.axios.api";
import { TCreateStore } from "../../type/TCreateStore";

export const createStoreApi = async (createStoreInfo?: TCreateStore) => {
  const response = await api.post(`/admin/store`, createStoreInfo);
  return response;
};
