"use client";

import React, { useState } from "react";
import { ReportType } from "@/types/report";
import Link from "next/link";
import { formatDate } from "@/utils/date-format";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";

const PAGE_LIMIT = 5;

interface Props {
  reports: ReportType[];
}

/* TODO: 활동 보고서 제목 hover시 text-underline */
const ReportList = ({ reports }: Props) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      <div className="w-full overflow-x-auto border-t border-gray-300 shadow">
        <table className="h-auto w-full overflow-x-auto">
          <thead className="bg-gray-200 text-sm uppercase text-gray-500">
            <tr>
              <th scope="col" className="px-6 py-4 text-left">
                제목
              </th>
              <th scope="col" className="min-w-12 px-6 py-4 text-left">
                작성일
              </th>
              <th scope="col" className="min-w-20 px-6 py-4">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {reports.length <= 0 && (
              <tr className="border-b border-gray-200 bg-gray-50 last:border-none">
                <td
                  className="whitespace-nowrap px-6 py-4 text-center text-gray-400"
                  colSpan={7}
                >
                  작성된 활동보고서가 없습니다.
                </td>
              </tr>
            )}
            {reports
              .slice((currentPage - 1) * PAGE_LIMIT, currentPage * PAGE_LIMIT)
              .map((report: ReportType) => (
                <tr
                  key={report._id}
                  className="border-b border-gray-200 bg-gray-50 last:border-none"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <Link
                      prefetch={false}
                      scroll={false}
                      href={`/reports/detail/${report._id}`}
                      className="hover:underline"
                    >
                      {report.title}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-400">
                    {formatDate(report.createdAt)}
                  </td>
                  <td className="flex flex-row items-center justify-evenly px-6 py-4 text-gray-400">
                    <Link
                      prefetch={false}
                      scroll={false}
                      href={`/reports/delete/${report._id}`}
                    >
                      삭제
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="my-5">
        <Pagination
          maxPage={Math.ceil(reports.length / PAGE_LIMIT)}
          limit={PAGE_LIMIT}
          pageState={{ currentPage, setCurrentPage }}
        />
      </div>
      <div className="flex h-auto w-full flex-row items-center justify-end gap-4">
        <button
          className="h-12 w-40 rounded-md bg-sky-500 text-white shadow"
          onClick={() => router.push("/reports/create", { scroll: false })}
        >
          활동보고서 작성
        </button>
      </div>
    </>
  );
};

export default ReportList;
