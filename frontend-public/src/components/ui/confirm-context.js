import { createContext, useContext } from "react";

export const ConfirmCtx = createContext(null);

export function useConfirm() {
  return useContext(ConfirmCtx);
}
