import { useState, useCallback } from "react";
import Modal from "./modal";
import { ConfirmCtx } from "./confirm-context";

export default function ConfirmProvider({ children }) {
  const [state, setState] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    hideCancel: false,
    variant: "primary",
    resolve: null,
  });

  const confirm = useCallback((opts = {}) => {
    return new Promise((resolve) => {
      setState((s) => ({ ...s, ...opts, open: true, resolve }));
    });
  }, []);

  const handleClose = (value) => {
    state.resolve?.(value);
    setState((s) => ({ ...s, open: false, resolve: null }));
  };

  const primaryBtn =
    state.variant === "danger"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white";

  return (
    <ConfirmCtx.Provider value={{ confirm }}>
      {children}

      <Modal
        open={state.open}
        onClose={() => handleClose(false)}
        title={state.title}
        footer={
          <>
            {!state.hideCancel && (
              <button
                onClick={() => handleClose(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
              >
                {state.cancelText}
              </button>
            )}
            <button
              onClick={() => handleClose(true)}
              className={`px-4 py-2 rounded ${primaryBtn}`}
            >
              {state.confirmText}
            </button>
          </>
        }
      >
        <p className="text-gray-700">{state.message}</p>
      </Modal>
    </ConfirmCtx.Provider>
  );
}
