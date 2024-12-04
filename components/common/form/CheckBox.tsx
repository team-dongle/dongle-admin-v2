"use client";

import React, { useState } from "react";
import clsx from "clsx";

interface Props {
  name: string;
  defaultChecked?: boolean;
}

const CheckBox = ({ name, defaultChecked }: Props) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked || false);

  return (
    <div className="flex flex-row">
      <input
        className="hidden"
        name={name}
        type="checkbox"
        id={name}
        defaultChecked={checked}
      />
      <label
        htmlFor={name}
        onClick={() => setChecked((prev) => !prev)}
        className={clsx(
          `relative h-8 w-16 rounded-3xl border bg-gray-200 shadow-inner after:absolute after:top-[50%] after:block after:h-6 after:w-6 after:translate-y-[-50%] after:rounded-2xl after:bg-white after:shadow after:content-[""]`,
          { [`bg-sky-500 after:right-1`]: checked, [`after:left-1`]: !checked },
        )}
      ></label>
    </div>
  );
};

export default CheckBox;
