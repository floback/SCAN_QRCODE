import React from "react";
import classNames from "classnames";

type ButtonType = "primary" | "secondary";
type ButtonSize = "default" | "small";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  typeStyle?: ButtonType;
  fullWidth?: boolean;
  size?: ButtonSize;
}

export default function Button({
  children,
  typeStyle = "primary",
  fullWidth = true,
  size = "default",
  className,
  ...rest
}: ButtonProps) {
  const baseStyles =
    "rounded-xl font-semibold transition duration-200 ease-in-out focus:outline-none shadow";

  const sizeStyles = {
    default: "px-6 py-3 text-lg",
    small: "px-4 py-2 text-sm",
     sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const typeStyles = {
    primary:
      "bg-cyan-500 hover:bg-cyan-50 hover:text-cyan-900 text-white border border-cyan-500",
    secondary:
      "bg-white hover:bg-cyan-500 hover:text-white text-cyan-600 border border-cyan-400",
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  const buttonClass = classNames(
    baseStyles,
    sizeStyles[size],
    typeStyles[typeStyle],
    widthStyle,
    className
  );

  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  );
}
