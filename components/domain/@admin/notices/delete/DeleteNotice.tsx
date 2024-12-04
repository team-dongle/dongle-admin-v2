"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { deleteNotice } from "@/apis/notice";

interface Props {
  noticeId: number;
}

const DeleteNotice = ({ noticeId }: Props) => {
  const router = useRouter();

  const deleteHandler = async () => {
    const _response = await deleteNotice(noticeId);

    if (_response.code >= 400) alert("공지사항 삭제중 오류가 발생했습니다.");

    window.location.href = "/notices";
  };

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-1">
      <span>정말 공지사항을 삭제하시겠어요?</span>
      <span>삭제 후 복구가 불가능 할 수 있습니다.</span>
      <div className="mt-4 flex h-auto w-full flex-row items-start justify-end gap-4">
        <button
          type="button"
          onClick={deleteHandler}
          className="h-12 w-36 rounded-md bg-red-500 text-white"
        >
          삭제
        </button>
        <button
          onClick={() => router.back()}
          className="h-12 w-36 rounded-md bg-gray-200 text-gray-400"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default DeleteNotice;
