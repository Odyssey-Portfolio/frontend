export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function TextInput({ label, ...props }: TextInputProps) {
  const containerClassname = `flex flex-col gap-2`;
  const labelSectionClassname = `flex flex-row justify-between items-center`;
  const labelClassname = `text-gray-700 font-medium`;
  const inputClassname = `w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2
                           focus:ring-blue-300 rounded-lg px-4 py-2 text-gray-700 
                           transition-all duration-200 outline-none`;
  const errorClassname = `text-red-500 text-sm font-bold`;
  return (
    <div className={containerClassname}>
      <div className={labelSectionClassname}>
        {label && <label className={labelClassname}>{label}</label>}
      </div>
      <input className={inputClassname} disabled={props.disabled} {...props} />
      {props.error && <div className={errorClassname}>{props.error}</div>}
    </div>
  );
}
