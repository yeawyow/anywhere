import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  register: any;
  errors: any;
  type?: string;
  placeholder?: string;
  className?: string;
  validation?: object;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  errors,
  type = 'text',
  placeholder = '',
  className = '',
  validation = {},
  readOnly,
}) => {
  return (
    <div className="relative">
      <label className="block text-gray-600">{label}</label>
      <input
        type={type}
        {...register(name, validation)}
        placeholder={placeholder}
        className={`px-3 py-2 border border-gray-300 rounded-md w-full ${className}`}
        readOnly={readOnly}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default InputField;
