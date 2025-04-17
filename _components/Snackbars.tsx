"use client";
import { removeSnackbarMessage } from "@/_redux/snackbar/snackbarActions";
import { selectMessages } from "@/_redux/snackbar/snackbarSelector";
import { AppDispatch } from "@/_redux/store";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

export default function SnackbarList() {
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(selectMessages);

  return (
    <div className="fixed bottom-5 right-5 space-y-3 z-50">
      <AnimatePresence>
        {messages.map((msg) => (
          <Snackbar
            key={msg.id}
            {...msg}
            onClose={() => dispatch(removeSnackbarMessage(msg.id))}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Snackbar({
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
      className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg transition-all animate-fade-in-up ${typeStyles[type]}`}
    >
      {message}
    </div>
  );
}
