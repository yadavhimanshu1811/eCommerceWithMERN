import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import Notification from "../Components/Notification";

interface NotificationContextProps {
  showNotification: (message: string, type?: "success" | "error" | "info") => void;
}

const NotificationContext = createContext<NotificationContextProps | null>(null);

export const useNotification = () => {
  return useContext(NotificationContext)!;
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "info">("info");

  const showNotification = (msg: string, type: "success" | "error" | "info" = "info") => {
    setMessage(msg);
    setType(type);
  };

  const handleClose = () => {
    setMessage("");
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {message && (
        <Notification message={message} type={type} onClose={handleClose} />
      )}
    </NotificationContext.Provider>
  );
}