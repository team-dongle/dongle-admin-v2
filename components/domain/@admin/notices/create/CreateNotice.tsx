"use client";

import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { createNoticeDispatcher } from "@/actions/notice";
import FormItem from "@/components/common/form/FormItem";
import Input from "@/components/common/form/Input";
import Textarea from "@/components/common/form/Textarea";
import { useRouter } from "next/navigation";
import UploadAttachment from "@/components/common/upload/UploadAttachment";
import { AttachmentType } from "@/types/file";

const CreateNotice = () => {
  const router = useRouter();
  const [state, dispatch] = useActionState(createNoticeDispatcher, undefined);
  const [attachments, setAttachments] = useState<AttachmentType[]>([]);

  useEffect(() => {
    console.log(state);
    if (state) {
      if (!state.ok && state.formError)
        alert("공지사항 작성중 오류가 발생했습니다.");
      if (state.ok) window.location.href = "/notices";
    }
  }, [state]);

  return (
    <div className="h-full w-full border-y-2 border-y-gray-300 bg-white p-6 shadow max-md:p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          const form = new FormData(e.currentTarget);
          form.append("attachments", JSON.stringify(attachments));
          startTransition(() => dispatch(form));
        }}
        className="flex h-auto w-full flex-col items-start justify-start gap-6"
      >
        <FormItem
          label="공지사항 제목"
          required={true}
          error={state && state.error?.title}
        >
          <Input
            name="title"
            type="text"
            placeholder="공지사항 제목을 입력해 주세요."
          />
        </FormItem>
        <FormItem
          label="공지사항 본문"
          required={true}
          error={state && state.error?.content}
        >
          <Textarea
            name="content"
            placeholder="공지사항 본문을 입력해 주세요."
          />
        </FormItem>
        <FormItem label="첨부파일">
          <UploadAttachment
            onFileListChange={(files) => setAttachments(files)}
          />
        </FormItem>
        <div className="mt-4 flex h-auto w-full flex-row justify-end gap-4">
          <button
            type="submit"
            className="h-12 w-36 rounded-md bg-sky-500 text-white"
          >
            공지사항 작성
          </button>
          <button
            onClick={() => router.push("/notices")}
            className="h-12 w-36 rounded-md bg-gray-200 text-gray-400"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNotice;
