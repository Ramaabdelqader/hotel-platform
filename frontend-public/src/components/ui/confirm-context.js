import { createContext, useContext } from "react";

export const ConfirmCtx = createContext(null);

export function useConfirm() {
  const ctx = useContext(ConfirmCtx);
  if (!ctx) throw new Error("useConfirm must be used inside <ConfirmProvider>");
  return ctx.confirm;
}
