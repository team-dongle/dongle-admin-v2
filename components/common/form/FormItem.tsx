import React from "react";
import clsx from "clsx";

interface Props {
  label?: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string[];
}

const FormItem = ({ label, required, children, error }: Props) => {
  return (
    <div className="flex h-auto w-full flex-col items-start justify-start gap-2">
      <label
        className={clsx(`text-md text-black`, {
          [`after:text-red-500 after:content-["*"]`]: required,
        })}
      >
        {label}
      </label>
      {children}
      {error && <span className="text-sm text-red-500">{error[0]}</span>}
    </div>
  );
};

export default FormItem;
