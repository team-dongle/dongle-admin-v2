"use client";

import React, { startTransition, useActionState, useEffect } from "react";
import FormItem from "@/components/common/form/FormItem";
import Input from "@/components/common/form/Input";
import { uploadBannerDispatcher } from "@/actions/banner";
import { useRouter } from "next/navigation";
import UploadBanner from "@/components/common/upload/UploadBanner";

const UploadBannerForm = () => {
  const router = useRouter();
  const [state, dispatch] = useActionState(uploadBannerDispatcher, {
    ok: false,
  });

  useEffect(() => {
    if (!state.ok && state.formError) alert(state.formError);
    if (state.ok) window.location.href = "/banners";
  }, [state]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = new FormData(e.currentTarget);
        startTransition(() => dispatch(form));
      }}
      className="flex h-full w-full flex-col items-start justify-start gap-2"
    >
      <div className="relative flex h-auto w-full flex-col items-start justify-start gap-4">
        <FormItem label="배너 이름" required error={state.errors?.name}>
          <Input
            type="text"
            name="name"
            placeholder="배너 이름을 입력하세요."
          />
        </FormItem>
        <FormItem label="배너 설명" required error={state.errors?.description}>
          <Input
            type="text"
            name="description"
            placeholder="배너 설명을 입력하세요."
          />
        </FormItem>
        <FormItem label="배너 이미지" required error={state.errors?.url}>
          <UploadBanner name="url" />
        </FormItem>
      </div>
      <div className="mt-4 flex h-auto w-full flex-row justify-end gap-4">
        <button
          type="submit"
          className="h-12 w-36 rounded-md bg-sky-500 text-white"
        >
          배너 추가
        </button>
        <button
          onClick={() => router.back()}
          className="h-12 w-36 rounded-md bg-gray-200 text-gray-400"
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default UploadBannerForm;
