import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom Toaster to listen to the simulated toast events
export function Toaster() {
  const [toasts, setToasts] = useState<Array<{ id: number; title?: string; description?: string }>>([]);

  useEffect(() => {
    const handleToast = (e: CustomEvent) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, ...e.detail }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    };

    window.addEventListener("toast", handleToast as EventListener);
    return () => window.removeEventListener("toast", handleToast as EventListener);
  }, []);

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-6 md:max-w-[420px] pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border border-white/10 bg-card p-6 pr-8 shadow-lg transition-all"
          >
            <div className="grid gap-1">
              {toast.title && <div className="text-sm font-semibold">{toast.title}</div>}
              {toast.description && (
                <div className="text-sm opacity-90 text-muted-foreground">{toast.description}</div>
              )}
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
