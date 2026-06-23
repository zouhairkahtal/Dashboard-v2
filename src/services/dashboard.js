import api from "../api/apiClient";

export const getDashboardData = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};
