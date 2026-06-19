import api from "../api/apiClient";

export const getBudgets = async () => {
  const response = await api.get("/budgets");

  return response.data;
};

export const deleteBudget = async (id) => {
  const response = await api.delete(`/budgets/${id}`);

  return response.data;
};

export const createBudget = async (budgets) => {
  const response = await api.post("/budgets", budgets);

  return response.data;
};
