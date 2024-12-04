"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CloseIcon from "@/assets/icons/close-icon.svg";
import HamburgerIcon from "@/assets/icons/hamburger-icon.svg";
import { SortableBannerType } from "@/types/banner";

interface Props {
  data: SortableBannerType;
  children: React.ReactNode;
  onDelete(id: number): void;
}

const BannerItem = ({ data, children, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      key={data.id}
      className="flex h-12 w-full select-none flex-row items-center justify-between border border-gray-400 bg-white px-4"
      ref={setNodeRef}
      style={style}
    >
      <button
        type="button"
        className="h-4 w-4"
        {...attributes}
        {...listeners}
        aria-describedby=""
      >
        <HamburgerIcon className="stroke-gray-500" />
      </button>
      <span className="block w-full pl-4 text-start">{children}</span>
      <div
        key={data.id}
        className="flex h-full w-auto flex-row items-center justify-start gap-2"
      >
        <button
          type="button"
          onClick={() => onDelete(data.id)}
          className="h-4 w-4"
        >
          <CloseIcon className="stroke-red-500" />
        </button>
      </div>
    </li>
  );
};

export default BannerItem;
