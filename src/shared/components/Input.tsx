import React, { useState } from "react";
import { AlertCircle, ExternalLink } from "lucide-react";
import { InputProps } from "../types/globle.type";
const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onchange,
  onfocus,
  error,
  name,
  placeholder,
  required = false,
  icon,
  showPasswordToggle = false,
  defaultValue,
  min,
  max,
  step,
  iconPosition,
  clasName,
  website,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;
  return (
    <div className="w-full ">
      {label && (
        <label
          htmlFor={value}
          className="block text-sm font-medium text-gray-300 mb-2 capitalize"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative rounded-[5px]">
        {icon && (
          <div
            className={`absolute inset-y-0  pl-3 flex items-center  ${
              iconPosition === "right"
                ? "right-2 pointer-events-auto cursor-pointer"
                : "left-0 pointer-events-none"
            }`}
          >
            <div className="text-gray-400">{icon}</div>
          </div>
        )}
        <input
          id={name}
          type={inputType}
          value={value || ""}
          name={name}
          required={required}
          autoComplete="off"
          onChange={onchange}
          onFocus={onfocus}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`w-full ${clasName} ${
            icon && iconPosition !== "right" ? "pl-10" : "pl-3"
          } ${
            showPasswordToggle ? "pr-10" : "pr-3"
          } px-4 py-3 bg-white/5 md:py-3 border  rounded-lg focus:outline-none focus:border-emerald-400  transition-colors placeholder-gray-600  ${
            error ? "border-red-500 bg-red-50" : "border-white/10"
          }`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <i className="fas fa-eye h-5 w-5 text-gray-400" />
            ) : (
              <i className="fas fa-eye-slash h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
        {website && "!websiteError" && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      {error && (
        <div className="mt-1 flex gap-1.5 items-center text-sm text-red-600">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}
    </div>
  );
};
export default Input;
