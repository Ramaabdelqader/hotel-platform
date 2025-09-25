import { useContext } from "react";
import { AuthCtx } from "../context/AuthContext";

export function useAuth() {
  return useContext(AuthCtx);
}
