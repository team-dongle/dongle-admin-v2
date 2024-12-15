"use client";

import React, { useEffect, useRef, useState } from "react";
import { ThumbnailType } from "@/types/file";
import { uploadThumbnail } from "@/apis/upload";
import DeleteIcon from "@/assets/icons/close-icon.svg";

interface Props {
  defaultValue?: ThumbnailType[];
  onImageChange(images: ThumbnailType[]): void;
}

const UploadThumbnail = ({ onImageChange, defaultValue }: Props) => {
  const [images, setImages] = useState<ThumbnailType[]>(defaultValue || []);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (images) onImageChange(images);
  }, [images]);

  const imageUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= 5) {
      alert("썸네일은 최대 5개까지 업로드 가능합니다.");
      return;
    }

    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];

      if (image.size >= 2e6) {
        alert("썸네일은 최대 2MB까지 업로드 가능합니다.");
        return;
      }

      const imageForm = new FormData();
      imageForm.append("thumbnail", image);

      const _response = await uploadThumbnail(imageForm);

      if (_response.code >= 400) {
        alert("썸네일 업로드 중 오류가 발생하였습니다.");
        return;
      }

      setImages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          key: Buffer.from(_response.result.key, "latin1").toString("utf8"),
          url: _response.result.url,
          fileName: Buffer.from(_response.result.fileName, "latin1").toString(
            "utf8",
          ),
        },
      ]);
    }

    return;
  };

  return (
    <div className="relative flex w-full flex-col items-start justify-start gap-2">
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        className="hidden"
        ref={imageRef}
        onChange={imageUploadHandler}
      />
      <ul className="h-auto w-full rounded-lg border border-gray-300 bg-white p-4">
        <li className="text-sm text-gray-500">
          썸네일 이미지는 개당 최대 2MB, 총 5개 업로드 가능합니다.
        </li>
        <li className="text-sm text-gray-500">
          지원 가능 확장자: .jpg, .jpeg, .png, .gif
        </li>
      </ul>
      <ul className="flex h-40 w-full flex-row items-center justify-start gap-4 overflow-x-auto rounded-md border border-gray-300 p-4 shadow">
        {images.map((image) => (
          <li
            key={image.id}
            className="relative flex h-full flex-col items-start justify-between gap-2"
          >
            <img
              alt="동아리 썸네일"
              src={image.url}
              className="h-24 w-24 border border-gray-300 object-cover"
            />
            <span className="block w-24 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500">
              {image.fileName}
            </span>
            <button
              type="button"
              onClick={() =>
                setImages((prev) =>
                  prev.filter((prevImage) => prevImage.key !== image.key),
                )
              }
              className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center"
            >
              <DeleteIcon className="h-4 w-4 fill-gray-700" />
            </button>
          </li>
        ))}
        {images.length <= 0 && (
          <li className="flex h-full w-full items-center justify-center text-gray-300">
            등록된 썸네일이 없습니다.
          </li>
        )}
      </ul>
      <button
        type="button"
        onClick={() => imageRef.current?.click()}
        className="h-12 w-full rounded-md border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white"
      >
        + 썸네일 업로드
      </button>
    </div>
  );
};

export default UploadThumbnail;
