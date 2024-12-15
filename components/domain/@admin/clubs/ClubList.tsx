"use client";

import React, { useState } from "react";
import { ClubType } from "@/types/club";
import Pagination from "@/components/common/Pagination";
import { formatDate } from "@/utils/date-format";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PAGE_LIMIT = 5;

interface Props {
  clubs: ClubType[];
}

const ClubList = ({ clubs }: Props) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      <div className="w-full overflow-x-auto border-t border-gray-300 shadow">
        <table className="h-auto w-full overflow-x-auto">
          <thead className="bg-gray-200 text-sm uppercase text-gray-500">
            <tr>
              <th scope="col" className="min-w-40 px-6 py-4 text-left">
                동아리 이름
              </th>
              <th scope="col" className="min-w-40 px-6 py-4 text-left">
                동아리 위치
              </th>
              <th scope="col" className="min-w-32 px-6 py-4 text-left">
                동아리 회장
              </th>
              <th scope="col" className="min-w-32 px-6 py-4 text-left">
                동아리 분과
              </th>
              <th scope="col" className="min-w-32 px-6 py-4 text-left">
                모집 여부
              </th>
              <th scope="col" className="min-w-40 px-6 py-4 text-left">
                모집 기간
              </th>
              <th scope="col" className="min-w-32 px-6 py-4">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {clubs.length <= 0 && (
              <tr className="border-b border-gray-200 bg-gray-50 last:border-none">
                <td
                  className="whitespace-nowrap px-6 py-4 text-center text-gray-400"
                  colSpan={7}
                >
                  등록된 동아리가 없습니다.
                </td>
              </tr>
            )}
            {clubs
              .slice((currentPage - 1) * PAGE_LIMIT, currentPage * PAGE_LIMIT)
              .map((club: ClubType) => (
                <tr
                  key={club._id}
                  className="border-b border-gray-200 bg-gray-50 last:border-none"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <a
                      className="hover:underline"
                      href={`${process.env.NEXT_PUBLIC_SERVICE_URL}/detail/${club._id}`}
                    >
                      {club.name}
                    </a>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-gray-400">
                    {club.location}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {club.owner?.name ?? "정보 없음"}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {club.category.name}
                  </td>
                  <td className="px-6 py-4">
                    {club.isRecruiting ? (
                      <span className="rounded-md bg-green-500 p-2 text-sm font-semibold text-white">
                        모집중
                      </span>
                    ) : (
                      <span className="rounded-md bg-gray-300 p-2 text-sm text-white">
                        모집 마감
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    ~ {formatDate(club.recruitPeriod)}
                  </td>
                  <td className="flex flex-row items-center justify-evenly px-6 py-4 text-gray-400">
                    <Link
                      prefetch={false}
                      scroll={false}
                      href={`/clubs/modify/${club._id}`}
                    >
                      수정
                    </Link>
                    <hr className="h-4 w-[1px] border-none bg-gray-300" />
                    <Link
                      prefetch={false}
                      scroll={false}
                      href={`/clubs/delete/${club._id}`}
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
          maxPage={Math.ceil(clubs.length / PAGE_LIMIT)}
          limit={PAGE_LIMIT}
          pageState={{ currentPage, setCurrentPage }}
        />
      </div>
      <div className="flex h-auto w-full flex-row items-center justify-end gap-4">
        <button
          className="h-12 w-40 rounded-md bg-sky-500 text-white shadow"
          onClick={() => router.push("/clubs/create", { scroll: false })}
        >
          동아리 생성
        </button>
      </div>
    </>
  );
};

export default ClubList;
