import { useState } from "react";
import { ConfirmCtx } from "./confirm-context";
import Modal from "./modal.jsx";

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);

  const confirm = (message, title = "Confirm Action") => {
    return new Promise((resolve) => {
      setState({
        message,
        title,
        onConfirm: () => {
          resolve(true);
          setState(null);
        },
        onCancel: () => {
          resolve(false);
          setState(null);
        },
      });
    });
  };

  return (
    <ConfirmCtx.Provider value={{ confirm }}>
      {children}

      <Modal
        open={!!state}
        onClose={state?.onCancel}
        title={state?.title}
        footer={
          <>
            <button
              onClick={state?.onCancel}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={state?.onConfirm}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Confirm
            </button>
          </>
        }
      >
        <p>{state?.message}</p>
      </Modal>
    </ConfirmCtx.Provider>
  );
}
