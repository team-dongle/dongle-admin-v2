"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CloseIcon from "@/assets/icons/close-icon.svg";

const Modal = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      className="relative h-auto max-h-[600px] w-[min(500px,100%)] overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
    >
      {title && (
        <h1 className="pb-4 text-lg font-semibold text-black">{title}</h1>
      )}
      <button
        type="button"
        className="absolute right-4 top-4 h-4 w-4"
        onClick={() => router.back()}
      >
        <CloseIcon />
      </button>
      {children}
    </div>
  );
};

export default Modal;
