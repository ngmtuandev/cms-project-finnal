import api from "../../config/client.axios.api";

export const getMachineByStore = async (storeCode: string) => {
  const response = await api.get(`/public/machine/find-machine-by-store`, {
    params: {
      storeCode,
    },
  });
  return response.data;
};
