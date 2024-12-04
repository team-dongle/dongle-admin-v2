"use client";

import React, { useRef, useState } from "react";
import clsx from "clsx";
import { uploadBanner } from "@/apis/upload";

interface Props {
  name: string;
}

const UploadBanner = ({ name }: Props) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const bannerUploadHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setUploading(true);
      const bannerFile = e.target.files[0];

      const imageForm = new FormData();
      imageForm.append("banner", bannerFile);

      const _response = await uploadBanner(imageForm);

      if (_response.code >= 400) {
        alert("배너 업로드중 오류가 발생했습니다.");
        setUploading(false);
        return;
      }

      setUploading(false);
      setImage(_response.result.url);
      return;
    }

    return;
  };

  return (
    <div className="flex h-auto w-full flex-col items-start justify-start gap-2">
      <input type="hidden" name={name} defaultValue={image || ""} />
      <input
        type="file"
        className="hidden"
        ref={fileRef}
        onChange={bannerUploadHandler}
      />
      <img
        src={image || "https://placehold.co/896x192"}
        className="aspect-[14/3] w-full border border-gray-300"
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className={clsx(
          "h-10 w-full rounded-md border border-sky-500 bg-white text-sm text-sky-500 hover:bg-sky-500 hover:text-white",
          {
            [`bg-gray-300`]: uploading,
          },
        )}
      >
        + 이미지 업로드
      </button>
      <button
        type="button"
        onClick={() => setImage("https://placehold.co/896x192")}
        className="h-10 w-full rounded-md border border-red-500 text-sm text-red-500"
      >
        삭제
      </button>
    </div>
  );
};

export default UploadBanner;
