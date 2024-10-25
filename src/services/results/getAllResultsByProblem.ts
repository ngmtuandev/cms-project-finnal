import api from "../../config/client.axios.api";

export const getAllResultsByProblem = async (problem: string) => {
  const response = await api.get(`/public/results/results-by-problem`, {
    params: {
      problem,
    },
  });
  return response.data;
};
