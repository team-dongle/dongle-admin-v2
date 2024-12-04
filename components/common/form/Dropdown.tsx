"use client";

import React from "react";

interface Props {
  name: string;
  data: { id: number; label: string; value: string | number }[];
  placeholder?: string;
}

const Dropdown = ({ name, data, placeholder }: Props) => {
  return (
    <select
      name={name}
      defaultValue=""
      className="h-10 w-full rounded-md border border-gray-300 px-1.5 text-sm shadow-sm outline-none"
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {data.map((option) => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
