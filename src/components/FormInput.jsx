import React from "react";

const FormInput = ({
  type = "text",
  name,
  id,
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  label,
  error
}) => (
  <div className="space-y-2">
    {label && (
      <label htmlFor={id || name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <input
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''} ${className}`}
      type={type}
      name={name}
      id={id || name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error && (
      <p className="text-red-500 text-sm">{error}</p>
    )}
  </div>
);

export default FormInput; 