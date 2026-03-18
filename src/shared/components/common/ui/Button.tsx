"use client";

import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export type IconPosition = "left" | "right";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  iconPosition?: IconPosition;
  icon?: ReactNode;
  children?: ReactNode;
  type?: "submit" | "reset" | "button";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50",
  secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  ghost: "text-gray-700 hover:bg-gray-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      iconPosition = "left",
      icon,
      children,
      type = "button",
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={clsx(
          "inline-flex items-center justify-center rounded-lg py-4 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-8  text-white font-semibold  transition-all backdrop-blur-sm",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          icon &&
          iconPosition === "left" && <span className="mr-2">{icon}</span>
        )}

        {children}

        {!isLoading && icon && iconPosition === "right" && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
