import api from "../../config/client.axios.api";

export const updateStatusLabApi = async (id: any) => {
  const response = await api.post(`/lab/update-room-empty`, {
    id: id,
  });
  return response.data;
};
