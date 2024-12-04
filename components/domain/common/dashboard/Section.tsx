"use client";

import React from "react";
import { redirect } from "next/navigation";

interface Props {
  title?: string;
  linkTo?: string;
  children: React.ReactNode;
}

const Section = ({ title, linkTo, children }: Props) => {
  return (
    <section className="relative flex h-72 w-full flex-col items-start justify-start gap-4 rounded-lg bg-white p-6 shadow max-md:w-full max-md:p-6">
      {title && (
        <>
          <div className="flex w-full flex-row items-center justify-between">
            <h1 className="text-xl font-semibold">{title}</h1>
            {linkTo && (
              <button
                className="text-sm text-gray-300"
                onClick={() => redirect(linkTo)}
              >
                더보기
              </button>
            )}
          </div>
          {/*<hr className="w-full" />*/}
        </>
      )}

      {children}
    </section>
  );
};

export default Section;
