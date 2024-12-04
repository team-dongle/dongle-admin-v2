"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/apis/user";

interface Props {
  userId: number;
}

const DeleteUser = ({ userId }: Props) => {
  const router = useRouter();

  const deleteHandler = async () => {
    const _response = await deleteUser(userId);

    if (_response.code >= 400) alert("회원 삭제중 오류가 발생하였습니다.");

    window.location.href = "/users";
  };

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-1">
      <span>정말 해당 회원을 삭제하시겠어요?</span>
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

export default DeleteUser;
