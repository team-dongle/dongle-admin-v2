import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={clsx(
        `h-10 w-full rounded-md border border-gray-300 px-2.5 text-sm shadow-sm outline-none`,
        { [`cursor-not-allowed bg-gray-100`]: props.disabled },
      )}
      {...props}
    />
  );
};

export default Input;
