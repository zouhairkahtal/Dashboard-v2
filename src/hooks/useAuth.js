import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authService";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },

    onError: (error) => {
      console.log("Login error", error);
    },
  });
};
