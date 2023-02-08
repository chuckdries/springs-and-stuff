import classNames from "classnames";
import { ReactNode, useState } from "react";

interface AsyncButtonProps {
  children: ReactNode;
}

type AsyncButtonState = "neutral" | "loading" | "succeeded" | "failed";

const BUTTON_ICON: Record<AsyncButtonState, ReactNode> = {
  neutral: <></>,
  loading: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 animate-spin"
    >
      <path
        fillRule="evenodd"
        d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
        clipRule="evenodd"
      />
    </svg>
  ),
  succeeded: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  ),
  failed: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

export function AsyncButton({ children }: AsyncButtonProps) {
  const [buttonState, setButtonState] = useState<AsyncButtonState>("neutral");
  const rotateState = () => {
    if (buttonState === "neutral") {
      setButtonState("loading");
    }
    if (buttonState === "loading") {
      setButtonState("succeeded");
    }
    if (buttonState === "succeeded") {
      setButtonState("failed");
    }
    if (buttonState === "failed") {
      setButtonState("neutral");
    }
  }
  return (
    <button
      type="button"
      onClick={() => {
        rotateState();
      }}
      className={classNames(
        "flex items-center text-lg p-3 rounded-lg border-2 transition-all border-green-500 bg-green-600 hover:bg-green-400",
        buttonState === "loading" && "border-blue-500 bg-blue-600 hover:bg-blue-400",
        buttonState === "failed" && "border-red-500 bg-red-600 hover:bg-red-400"
      )}
    >
      <span className="mr-2">{BUTTON_ICON[buttonState]}</span> {children}
    </button>
  );
}
