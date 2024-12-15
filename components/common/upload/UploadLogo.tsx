"use client";

import React, { useRef, useState } from "react";
import { uploadLogo } from "@/apis/upload";
import clsx from "clsx";

interface Props {
  name: string;
  defaultImage?: string;
}

const UploadLogo = ({ name, defaultImage }: Props) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(defaultImage || null);
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      const imageFile = e.target.files[0];
      const imageForm = new FormData();
      imageForm.append("image", imageFile);

      const _response = await uploadLogo(imageForm);

      if (_response.code >= 400) {
        alert("이미지 업로드 도중 오류가 발생하였습니다.");
        setUploading(false);
        return;
      }

      setImage(_response.result.url);
      setUploading(false);
      return;
    }
  };

  return (
    <div className="relative flex w-full flex-col items-start justify-start gap-2">
      <input type="hidden" name={name} defaultValue={image || ""} />
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        ref={fileRef}
        className="hidden"
        onChange={uploadHandler}
      />
      <div className="flex h-auto w-full flex-row flex-wrap items-start justify-start gap-4">
        <div className="h-[150px] w-[150px] overflow-hidden rounded-lg border border-gray-200">
          <img
            src={image || "https://placehold.co/150x150"}
            className="h-full w-full object-cover"
            alt="동아리 로고 이미지"
          />
        </div>
        <div className="flex h-auto w-full flex-col items-start justify-start gap-4">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className={clsx(
              "h-10 w-40 rounded-md border border-sky-500 bg-white text-sm text-sky-500 hover:bg-sky-500 hover:text-white",
              {
                [`bg-gray-300`]: uploading,
              },
            )}
          >
            + 이미지 업로드
          </button>
          <span className="text-sm text-gray-400">
            서버 과부화 문제로 잦은 로고 이미지 업로드는 삼가 부탁드립니다.
            <br />
            jpg, jpeg, png의 확장자를 가진 이미지 파일 업로드 가능합니다. (2MB
            이하)
          </span>
        </div>
      </div>
    </div>
  );
};

export default UploadLogo;
