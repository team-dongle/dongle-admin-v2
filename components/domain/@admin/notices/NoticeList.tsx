"use client";

import React, { useState } from "react";
import { NoticeType } from "@/types/notice";
import Link from "next/link";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/date-format";

const PAGE_LIMIT = 5;

interface Props {
  notices: NoticeType[];
}

const NoticeList = ({ notices }: Props) => {
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
                작성자
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
            {notices.length <= 0 && (
              <tr className="border-b border-gray-200 bg-gray-50 last:border-none">
                <td
                  className="whitespace-nowrap px-6 py-4 text-center text-gray-400"
                  colSpan={7}
                >
                  등록된 공지사항이 없습니다.
                </td>
              </tr>
            )}
            {notices
              .slice((currentPage - 1) * PAGE_LIMIT, currentPage * PAGE_LIMIT)
              .map((notice: NoticeType) => (
                <tr
                  key={notice._id}
                  className="border-b border-gray-200 bg-gray-50 last:border-none"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <Link
                      href={`${process.env.NEXT_PUBLIC_SERVICE_URL}/notice/detail/${notice._id}`}
                      className="flex w-full flex-row items-center justify-start gap-4 hover:underline"
                    >
                      {notice.title}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-400">
                    {notice.author.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-400">
                    {formatDate(notice.createdAt)}
                  </td>
                  <td className="flex flex-row items-center justify-evenly px-6 py-4 text-gray-400">
                    <Link
                      prefetch={false}
                      scroll={false}
                      href={`/notices/delete/${notice._id}`}
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
          maxPage={Math.ceil(notices.length / PAGE_LIMIT)}
          limit={PAGE_LIMIT}
          pageState={{ currentPage, setCurrentPage }}
        />
      </div>
      <div className="flex h-auto w-full flex-row items-center justify-end gap-4">
        <button
          className="h-12 w-40 rounded-md bg-sky-500 text-white shadow"
          onClick={() => router.push("/notices/create", { scroll: false })}
        >
          공지사항 작성
        </button>
      </div>
    </>
  );
};

export default NoticeList;
