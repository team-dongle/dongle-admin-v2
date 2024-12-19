"use client";

import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import FormItem from "@/components/common/form/FormItem";
import Input from "@/components/common/form/Input";
import Textarea from "@/components/common/form/Textarea";
import { useRouter } from "next/navigation";
import { createReportDispatcher } from "@/actions/report";
import UploadReportImage from "@/components/common/upload/UploadReportImage";
import { ReportImageType } from "@/types/file";

const CreateReport = () => {
  const router = useRouter();
  const [images, setImages] = useState<ReportImageType[]>([]);
  const [state, dispatch] = useActionState(createReportDispatcher, {
    ok: false,
  });

  useEffect(() => {
    if (!state.ok && state.formError) alert(state.formError);
    if (state.ok) window.location.href = "/reports";
  }, [state]);

  return (
    <div className="h-full w-full border-y-2 border-y-gray-300 bg-white p-6 shadow max-md:p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          const form = new FormData(e.currentTarget);
          form.append(
            "images",
            JSON.stringify(images.map((image) => ({ url: image.url }))),
          );
          startTransition(() => dispatch(form));
        }}
        className="flex h-auto w-full flex-col items-start justify-start gap-6"
      >
        <FormItem
          label="활동보고서 제목"
          required={true}
          error={state && state.error?.title}
        >
          <Input
            name="title"
            type="text"
            placeholder="활동보고서 제목을 입력해 주세요."
          />
        </FormItem>
        <FormItem
          label="활동보고서 본문"
          required={true}
          error={state && state.error?.content}
        >
          <Textarea
            name="content"
            placeholder="활동보고서 본문을 입력해 주세요."
          />
        </FormItem>
        <FormItem
          label="활동 사진"
          required
          error={state && state.error?.images}
        >
          <UploadReportImage onImageChange={(images) => setImages(images)} />
        </FormItem>
        <div className="mt-4 flex h-auto w-full flex-row justify-end gap-4">
          <button
            type="submit"
            className="h-12 w-36 rounded-md bg-sky-500 text-white"
          >
            활동보고서 작성
          </button>
          <button
            type="button"
            onClick={() => router.push("/reports")}
            className="h-12 w-36 rounded-md bg-gray-200 text-gray-400"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReport;
