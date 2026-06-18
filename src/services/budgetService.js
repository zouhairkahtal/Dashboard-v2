import api from "../api/apiClient";

export const getBudgets = async () => {
  const response = await api.get("/budgets");

  return response.data;
};
