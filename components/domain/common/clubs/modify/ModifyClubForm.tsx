"use client";

import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import Input from "@/components/common/form/Input";
import FormItem from "@/components/common/form/FormItem";
import Textarea from "@/components/common/form/Textarea";
import { useRouter } from "next/navigation";
import UploadLogo from "@/components/common/upload/UploadLogo";
import { ClubPayload } from "@/types/club";
import { updateClubDispatcher } from "@/actions/club";
import CheckBox from "@/components/common/form/CheckBox";
import moment from "moment/moment";
import UploadThumbnail from "@/components/common/upload/UploadThumbnail";
import { ThumbnailType } from "@/types/file";

interface Props {
  defaultValue: ClubPayload;
}

const ModifyClubForm = ({ defaultValue }: Props) => {
  const router = useRouter();
  const [state, dispatch] = useActionState(updateClubDispatcher, { ok: false });
  const [thumbnail, setThumbnail] = useState<ThumbnailType[]>([]);

  useEffect(() => {
    if (state.ok) window.location.href = "/clubs";
    if (!state.ok && state.formError) alert(state.formError);
  }, [state]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = new FormData(e.currentTarget);
        form.append("thumbnail", JSON.stringify(thumbnail));
        startTransition(() => dispatch(form));
      }}
      className="flex h-auto w-full flex-col items-start justify-start gap-2"
    >
      <div className="relative flex h-auto w-full flex-col items-start justify-start gap-4">
        <input type="hidden" name="_id" value={defaultValue._id} />
        <FormItem label="동아리 로고">
          <UploadLogo name="logo" defaultImage={defaultValue.logo} />
        </FormItem>
        <FormItem label="동아리 썸네일">
          <UploadThumbnail
            onImageChange={(images) => setThumbnail(images)}
            defaultValue={
              typeof defaultValue.thumbnail === "string"
                ? (JSON.parse(
                    defaultValue.thumbnail ?? "[]",
                  ) as ThumbnailType[])
                : defaultValue.thumbnail
            }
          />
        </FormItem>
        <FormItem label="동아리명" required={true} error={state.errors?.name}>
          <Input
            type="text"
            name="name"
            placeholder="동아리명을 입력해 주세요."
            autoComplete="off"
            defaultValue={defaultValue.name}
          />
        </FormItem>
        <FormItem
          label="동아리 위치"
          required={true}
          error={state.errors?.location}
        >
          <Input
            type="text"
            name="location"
            placeholder="동아리 위치를 입력해 주세요."
            autoComplete="off"
            defaultValue={defaultValue.location}
          />
        </FormItem>
        <FormItem
          label="대표 연락처"
          required={true}
          error={state.errors?.contact}
        >
          <Input
            type="text"
            name="contact"
            placeholder="대표 연락처를 입력해 주세요."
            autoComplete="off"
            defaultValue={defaultValue.contact}
          />
        </FormItem>
        <FormItem
          label="지원 링크"
          required={true}
          error={state.errors?.applyUrl}
        >
          <Input
            type="text"
            name="applyUrl"
            placeholder="동아리 지원 시 이동할 지원 링크를 입력해 주세요."
            autoComplete="off"
            defaultValue={defaultValue.applyUrl}
          />
        </FormItem>
        <FormItem
          label="모집 여부"
          required={true}
          error={state.errors?.isRecruiting}
        >
          <CheckBox
            name="isRecruiting"
            defaultChecked={defaultValue.isRecruiting}
          />
        </FormItem>
        <FormItem
          label="모집 기간"
          required={false}
          error={state.errors?.recruitPeriod}
        >
          <Input
            type="date"
            name="recruitPeriod"
            placeholder="동아리 모집 기간을 선택해 주세요."
            defaultValue={moment(defaultValue.recruitPeriod).format(
              "YYYY-MM-DD",
            )}
            min={moment().format("YYYY-MM-DD")}
          />
        </FormItem>
        <FormItem label="동아리 SNS">
          <Input
            type="text"
            name="sns"
            placeholder="동아리 SNS를 입력해 주세요."
            autoComplete="off"
            defaultValue={defaultValue.sns}
          />
        </FormItem>
        <FormItem
          label="동아리 소개"
          required={true}
          error={state.errors?.detail}
        >
          <Textarea
            name="detail"
            placeholder="동아리 소개를 입력해 주세요."
            defaultValue={defaultValue.detail}
          />
        </FormItem>
      </div>
      <div className="mt-4 flex h-auto w-full flex-row justify-end gap-4">
        <button
          type="submit"
          className="h-12 w-36 rounded-md bg-sky-500 text-white"
        >
          동아리 수정
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

export default ModifyClubForm;
