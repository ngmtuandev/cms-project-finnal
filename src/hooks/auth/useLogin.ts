import { useMutation } from "@tanstack/react-query";
import { apiLogin } from "../../services";

export const useLogin = () => {
  return useMutation({
    mutationFn: (loginInfo: any) => apiLogin(loginInfo),
  });
};
