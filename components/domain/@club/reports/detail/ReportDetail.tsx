"use client";

import React from "react";
import ReportImages from "@/components/domain/@club/reports/detail/ReportImages";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  content: string;
  images: string[];
}

const ReportDetail = ({ title, content, images }: Props) => {
  const router = useRouter();

  return (
    <div className="flex h-auto w-full flex-col items-start justify-start gap-6">
      <ReportImages images={images} />
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-zinc-700">{title}</h2>
        <p className="text-lg text-zinc-500">2024/12/19</p>
      </div>
      <div className="h-auto w-full overflow-y-auto">
        {content.split("\n").map((line, idx) => (
          <p className="text-lg text-zinc-700" key={idx}>
            {line}
          </p>
        ))}
      </div>
      <div className="mt-4 flex h-auto w-full flex-row items-start justify-end gap-4">
        <button
          onClick={() => router.back()}
          className="h-12 w-36 rounded-md bg-gray-200 text-gray-400"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ReportDetail;
