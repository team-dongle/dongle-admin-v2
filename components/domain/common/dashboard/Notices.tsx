import React from "react";
import { getNoticeList } from "@/apis/notice";
import Link from "next/link";
import { formatDate } from "@/utils/date-format";

const Notices = async () => {
  const notices = await getNoticeList();

  return (
    <div className="h-auto w-full overflow-auto">
      {notices.result.rows.length <= 0 && (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-gray-400">등록된 공지사항이 없습니다.</span>
        </div>
      )}
      <ul className="flex h-auto w-full flex-col items-start justify-start">
        {notices.result.rows.slice(0, 3).map((notice) => {
          return (
            <li key={notice._id} className="w-full border-b border-gray-100">
              <Link
                href={`${process.env.NEXT_PUBLIC_SERVICE_URL}/notice/detail/${notice._id}`}
                className="flex h-12 w-full flex-row items-center justify-between"
              >
                <span className="text-md text-gray-700 hover:underline">
                  {notice.title}
                </span>

                <span className="text-center text-sm text-gray-300">
                  {formatDate(notice.createdAt)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Notices;
