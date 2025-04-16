import { useEffect } from "react";

interface SnackbarProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

const typeStyles = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  info: "bg-blue-500 text-white",
};

export default function Snackbar({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: SnackbarProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg transition-all animate-fade-in-up ${typeStyles[type]}`}
    >
      {message}
    </div>
  );
}
