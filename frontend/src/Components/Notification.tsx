import { useEffect } from "react";
// import soundFile from "../assets/notification.mp3";

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
    // Play sound
    // const audio = new Audio(soundFile);
    // audio.volume = 0.4;
    // audio.play().catch(() => {});

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!message) return null;

  const colors: Record<NotificationType, string> = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
  };

  return (
    <div
      className={`
        fixed top-0 left-1/2 -translate-x-1/2 
        mt-4 px-5 py-3 rounded-md shadow-xl 
        animate-slideDown z-50
        ${colors[type]}
      `}
    >
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button className="font-bold" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
}