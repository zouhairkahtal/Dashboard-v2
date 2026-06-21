import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import {
  getBudgets,
  deleteBudget,
  createBudget,
  updateBudget,
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
      toast.success("Budget deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete budget");
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
      toast.success("Budget created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create budget");
    },
  });
};

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });
      toast.success("Budget updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update budget");
    },
  });
};
