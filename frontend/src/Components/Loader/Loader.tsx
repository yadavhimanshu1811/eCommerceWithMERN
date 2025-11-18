import "./Loader.css"

type LoaderSize = "sm" | "md" | "lg";

interface LoaderProps {
  /** Show fullscreen overlay (optional) */
  fullScreen?: boolean;

  /** Optional text below the spinner */
  message?: string;

  /** Spinner size for inline loader */
  size?: LoaderSize;
}

export default function Loader({
  fullScreen = false,
  message,
  size = "md",
}: LoaderProps) {
  return (
    <div className={`loader-wrapper ${fullScreen ? "fullscreen" : ""}`}>
      <div className={`loader-spinner ${size}`} />
      {message && <div className="loader-message">{message}</div>}
    </div>
  );
}