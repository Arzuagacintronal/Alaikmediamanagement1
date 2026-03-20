// Polyfill for use-toast if not provided by base
import { useState, useEffect } from "react";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    // Basic browser alert fallback if standard shadcn toast isn't fully wired
    // In a real app this pushes to context, but this is a standalone shim.
    if (typeof window !== "undefined") {
        // Dispatch custom event for the Toaster component to catch
        const event = new CustomEvent("toast", { detail: props });
        window.dispatchEvent(event);
    }
  };

  return { toast, toasts };
}
