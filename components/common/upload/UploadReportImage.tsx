"use client";

import React, { useEffect, useRef, useState } from "react";
import { ReportImageType } from "@/types/file";
import { uploadReportImage } from "@/apis/upload";

interface Props {
  onImageChange: (images: ReportImageType[]) => void;
}

const UploadReportImage = ({ onImageChange }: Props) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [images, setImages] = useState<ReportImageType[]>([]);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onImageChange(images);
  }, [images]);

  const imageUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      const file = e.target.files[0];

      const imageForm = new FormData();
      imageForm.append("image", file);

      const _response = await uploadReportImage(imageForm);

      if (_response.code >= 400) {
        alert("활동 사진 업로드중 오류가 발생했습니다.");
        setUploading(false);
        return;
      }

      setImages((prev) => [...prev, _response.result]);
      setUploading(false);
      return;
    }

    return;
  };

  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <input
        type="file"
        onChange={imageUploadHandler}
        accept=".jpg, .jpeg, .png, .gif"
        className="hidden"
        ref={imageRef}
      />
      <ul className="flex h-48 w-full flex-row items-center justify-start gap-4 rounded-md border border-gray-200 p-6">
        {images.length <= 0 && (
          <li className="flex h-full w-full items-center justify-center text-gray-500">
            업로드된 이미지가 없습니다.
          </li>
        )}
        {images.length > 0 &&
          images.map((image, index) => (
            <li
              key={index}
              className="relative h-36 w-36 border border-gray-100"
            >
              <img
                alt="활동 사진"
                src={image.url}
                className="h-36 w-36 object-cover"
              />
            </li>
          ))}
      </ul>
      <button
        type="button"
        onClick={() => imageRef.current?.click()}
        className="h-12 w-full rounded-md border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white"
        disabled={uploading}
      >
        이미지 업로드
      </button>
    </div>
  );
};

export default UploadReportImage;
