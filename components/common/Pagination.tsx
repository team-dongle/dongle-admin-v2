"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import ChevronLeft from "@/assets/icons/chevron-left.svg";
import ChevronRight from "@/assets/icons/chevron-right.svg";

interface Props {
  maxPage: number;
  limit: number;
  pageState: {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
  };
}

const Pagination = ({ maxPage, limit, pageState }: Props) => {
  const { currentPage, setCurrentPage } = pageState;
  const [pageRange, setPageRange] = useState<number[]>(
    Array.from({ length: maxPage < limit ? maxPage : limit }, (_, i) => i + 1),
  );

  const prev = () => {
    if (currentPage - 1 <= 0) return;
    if ((currentPage - 1) % limit === 0)
      setPageRange(
        Array.from({ length: limit }, (_, i) => currentPage - limit + i),
      );
    setCurrentPage((prev) => prev - 1);
  };

  const next = () => {
    if (currentPage + 1 > maxPage) return;
    if ((currentPage + 1) % limit === 1)
      setPageRange(
        Array.from(
          {
            length:
              maxPage - currentPage < limit ? maxPage - currentPage : limit,
          },
          (_, i) => currentPage + 1 + i,
        ),
      );
    setCurrentPage((prev) => prev + 1);
  };

  if (maxPage <= 1) return;

  return (
    <ul className="flex h-auto w-full flex-row items-center justify-center gap-2.5">
      <li>
        <button
          className="flex h-8 w-8 items-center justify-center"
          onClick={prev}
        >
          <ChevronLeft className="stroke-gray-500" />
        </button>
      </li>
      {pageRange.map((page) => (
        <li
          key={page}
          className={`h-8 w-8 rounded-md bg-none ${currentPage === page ? `bg-sky-700 text-white` : `text-gray-500`}`}
        >
          <button
            onClick={() => setCurrentPage(page)}
            className="h-full w-full border-none bg-none outline-none"
          >
            {page}
          </button>
        </li>
      ))}
      <li>
        <button
          className="flex h-8 w-8 items-center justify-center"
          onClick={next}
        >
          <ChevronRight className="stroke-gray-500" />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
