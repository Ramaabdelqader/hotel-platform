import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,              // buttons/actions
  closeOnBackdrop = true,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => closeOnBackdrop && onClose?.()}
      />
      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className="absolute inset-0 flex items-center justify-center p-4"
      >
        <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
          {title && (
            <div className="border-b px-5 py-4">
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
          )}
          <div className="px-5 py-4">{children}</div>
          {footer && <div className="border-t px-5 py-3 flex gap-3 justify-end">{footer}</div>}
        </div>
      </div>
    </div>,
    document.body
  );
}
