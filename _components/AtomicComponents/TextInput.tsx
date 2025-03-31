import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function TextInput({ label, ...props }: TextInputProps) {
  const containerClassname = `flex flex-col gap-2`;
  const labelClassname = `text-gray-700 font-medium`
  const inputClassname = `w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2
                           focus:ring-blue-300 rounded-lg px-4 py-2 text-gray-700 
                           placeholder-gray-400 transition-all duration-200 outline-none`
    return (
    <div className={containerClassname}>
      {label && <label className={labelClassname}>{label}</label>}
      <input
        className={inputClassname}
        {...props}
      />
    </div>
  );
}
