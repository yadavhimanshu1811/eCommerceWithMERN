import { useEffect } from "react";
import "./Notification.css";

type NotificationType = "success" | "error" | "info";

interface NotificationProps {
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose: () => void;
}

export default function Notification({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!message) return null;

  return (
    <div className={`notification-container ${type}`}>
      <div className="notification-content">
        <span>{message}</span>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
}