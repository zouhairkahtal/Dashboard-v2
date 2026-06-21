import api from "../api/apiClient";

export const createExpense = async (expense) => {
  const response = await api.post("/expenses", expense);

  return response.data;
};
export const getExpenses = async () => {
  const response = await api.get("/expenses");
  return response.data;
};
