import api from "../../config/client.axios.api";

export const deleteResultApi = async (idResult: string) => {
  const response = await api.delete(`/admin/result`, {
    params: {
      idResult,
    },
  });
  return response;
};
