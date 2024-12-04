"use client";

import React, { useState } from "react";
import Link from "next/link";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/user";

const PAGE_LIMIT = 5;

interface Props {
  users: UserType[];
}

const UserList = ({ users }: Props) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      <div className="w-full overflow-x-auto border-t border-gray-300 shadow">
        <table className="h-auto w-full overflow-x-auto">
          <thead className="bg-gray-200 text-sm uppercase text-gray-500">
            <tr>
              <th scope="col" className="min-w-32 px-6 py-4 text-left">
                회원 아이디
              </th>
              <th scope="col" className="min-w-24 px-6 py-4 text-left">
                이름
              </th>
              <th scope="col" className="min-w-40 px-6 py-4 text-left">
                소속 동아리
              </th>
              <th scope="col" className="min-w-36 px-6 py-4 text-left">
                권한
              </th>
              <th scope="col" className="min-w-20 px-6 py-4">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.length <= 0 && (
              <tr className="border-b border-gray-200 bg-gray-50 last:border-none">
                <td
                  className="whitespace-nowrap px-6 py-4 text-center text-gray-400"
                  colSpan={7}
                >
                  등록된 회원이 없습니다.
                </td>
              </tr>
            )}
            {users
              .slice((currentPage - 1) * PAGE_LIMIT, currentPage * PAGE_LIMIT)
              .map((user: UserType) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 bg-gray-50 last:border-none"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex w-full flex-row items-center justify-start gap-4">
                      <span
                        className={`relative block w-full after:absolute after:top-0 after:block after:h-full after:w-full after:bg-red-500 after:text-center after:text-white after:backdrop-blur after:content-["아이디_보기"] hover:cursor-pointer hover:after:hidden`}
                      >
                        {user.username}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-400">
                    {user.club ? (
                      <a
                        className="hover:underline"
                        href={`${process.env.NEXT_PUBLIC_SERVICE_URL}/detail/${user.club._id}`}
                      >
                        {user.club.name}
                      </a>
                    ) : (
                      <>소속 없음</>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "CLUB" && (
                      <span className="rounded-md bg-sky-700 p-2 text-sm font-semibold text-white">
                        동아리 회장
                      </span>
                    )}
                  </td>
                  <td className="flex flex-row items-center justify-evenly px-6 py-4 text-gray-400">
                    <Link
                      prefetch={false}
                      scroll={false}
                      href={`/users/delete/${user._id}`}
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
          maxPage={Math.ceil(users.length / PAGE_LIMIT)}
          limit={PAGE_LIMIT}
          pageState={{ currentPage, setCurrentPage }}
        />
      </div>
      <div className="flex h-auto w-full flex-row items-center justify-end gap-4">
        <button
          className="h-12 w-40 rounded-md bg-sky-500 text-white shadow"
          onClick={() => router.push("/users/create", { scroll: false })}
        >
          회원 생성
        </button>
      </div>
    </>
  );
};

export default UserList;
