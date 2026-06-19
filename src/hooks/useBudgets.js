import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getBudgets,
  deleteBudget,
  createBudget,
} from "../services/budgetService";

export const useBudgets = () => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });
    },
  });
};

export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });
    },
  });
};
