import React, { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={clsx(
        `h-40 w-full resize-none rounded-md border border-gray-300 p-2.5 text-sm shadow-sm outline-none`,
        { [`cursor-not-allowed bg-gray-100`]: props.disabled },
      )}
      {...props}
    />
  );
};

export default Textarea;
