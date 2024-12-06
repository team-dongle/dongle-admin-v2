"use client";

import { AttachmentType } from "@/types/file";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { uploadAttachment } from "@/apis/upload";

interface Props {
  onFileListChange(files: AttachmentType[]): void;
}

const UploadAttachment = ({ onFileListChange }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<AttachmentType[]>([]);

  useEffect(() => {
    if (files) onFileListChange(files);
  }, [files]);

  const fileUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (files.length >= 5) {
      alert("첨부파일은 최대 5개까지 업로드 가능합니다.");
      return;
    }

    if (e.target.files) {
      const file = e.target.files[0];

      if (file.size >= 10e6) {
        alert("파일은 최대 10MB 까지 업로드 가능합니다.");
        return;
      }

      const fileForm = new FormData();
      fileForm.append("file", file);

      const _response = await uploadAttachment(fileForm);

      if (_response.code >= 400) {
        console.log(_response);
        alert("파일 업로드 중 오류가 발생하였습니다.");
        return;
      }

      setFiles((prev) => [
        ...prev,
        {
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
    <div className="w-full">
      <input
        type="file"
        accept=".pdf, .hwp, .hwpx, .png, .jpg, .jpeg, .docx, .doc"
        className="hidden"
        ref={fileRef}
        onChange={fileUploadHandler}
      />
      <ul className="mb-4 h-auto w-full rounded-lg border border-gray-300 bg-white p-4">
        <li className="text-sm text-gray-500">
          각 파일은 최대 10MB, 총 5개 업로드 가능합니다.
        </li>
        <li className="text-sm text-gray-500">
          지원 가능 확장자: .pdf, .hwp, .hwpx, .png, .jpg, .jpeg, .docx, .doc
        </li>
      </ul>
      <ul className="flex w-[min(500px,100%)] flex-col items-start justify-start gap-2">
        {files.map((file: AttachmentType) => (
          <li
            key={file.key}
            className="flex h-auto w-full flex-row items-center justify-between"
          >
            <span>{file.fileName}</span>
            <button
              className="h-6 w-12 rounded-md bg-red-500 text-sm text-white"
              onClick={() =>
                setFiles((prev) =>
                  prev.filter((prevFile) => prevFile.key !== file.key),
                )
              }
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="text-blue-500 hover:underline"
        onClick={() => fileRef.current?.click()}
      >
        파일 업로드
      </button>
    </div>
  );
};

export default UploadAttachment;
