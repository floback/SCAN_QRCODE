// components/Input.tsx
import React, { useState } from "react";
import classNames from "classnames";
import { Eye, EyeOff } from "lucide-react"; // Usa ícones do lucide-react

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  showTogglePassword?: boolean; // para ativar o olho
}

export default function Input({
  label,
  error,
  className,
  fullWidth = true,
  size = "md",
  showTogglePassword = false,
  type = "text",
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const inputType = showTogglePassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={classNames("flex flex-col gap-1 relative", { "w-full": fullWidth })}>
      {label && <label className="text-sm font-medium text-gray-900">{label}</label>}

      <input
        {...rest}
        type={inputType}
        className={classNames(
          "text-gray-700 rounded-md border shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-10",
          sizeStyles[size],
          {
            "border-gray-700": !error,
            "border-red-500 ring-red-300": error,
          },
          className
        )}
      />

      {showTogglePassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[36px] text-gray-500 hover:text-gray-700"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}

      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
