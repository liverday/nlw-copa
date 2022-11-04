import { useContext } from "react";
import { AuthContext, AuthContextData } from "../contexts/AuthContext";

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Cannot use "useAuth" outside AuthContextProvider')
  }

  return context;
}