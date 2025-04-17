import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem("authToken");
    queryClient.removeQueries({
      queryKey: ["me", "users", "teachers", "pupils", "subjects"],
    });
    navigate("/sign-in");
  };
};
