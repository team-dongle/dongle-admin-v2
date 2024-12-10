"use server";

import { CreateClubFormState, UpdateClubFormState } from "@/types/form-states";
import { ClubPayload } from "@/types/club";
import {
  isCreateClubFormValid,
  isUpdateClubFormValid,
} from "@/actions/validators/club";
import { createClub, updateClub } from "@/apis/club";

export async function createClubDispatcher(
  state: CreateClubFormState | null,
  formData: FormData,
): Promise<CreateClubFormState> {
  const thumbnail = formData.get("thumbnail") as string | undefined;
  const payload: ClubPayload = {
    name: formData.get("name") as string,
    location: formData.get("location") as string,
    contact: formData.get("contact") as string,
    sns: (formData.get("sns") as string) || undefined,
    logo: (formData.get("logo") as string) || undefined,
    thumbnail: thumbnail
      ? (JSON.parse(thumbnail) as ClubPayload["thumbnail"])
      : undefined,
    detail: formData.get("detail") as string,
    isRecruiting: (formData.get("isRecruiting") as string) === "on",
    recruitPeriod:
      (formData.get("isRecruiting") as string) === "on"
        ? new Date(formData.get("recruitPeriod") as string)
        : new Date(),
    applyUrl: formData.get("applyUrl") as string,
    categoryId: parseInt(formData.get("categoryId") as string, 10),
    ownerId: formData.get("ownerId") as string,
  };

  const validate = isCreateClubFormValid(payload);

  if (!validate.success)
    return { ok: false, errors: validate.error.flatten().fieldErrors };

  const _response = await createClub(payload);

  if (_response.code >= 400)
    return { ok: false, formError: "동아리 생성중 오류가 발생했습니다." };

  return { ok: true };
}

export async function updateClubDispatcher(
  state: UpdateClubFormState | null,
  formData: FormData,
) {
  const thumbnail = formData.get("thumbnail") as string | undefined;
  const payload: ClubPayload = {
    _id: parseInt(formData.get("_id") as string, 10),
    name: formData.get("name") as string,
    location: formData.get("location") as string,
    contact: formData.get("contact") as string,
    sns: (formData.get("sns") as string) || undefined,
    logo: (formData.get("logo") as string) || "",
    thumbnail: thumbnail
      ? (JSON.parse(thumbnail) as ClubPayload["thumbnail"])
      : undefined,
    detail: formData.get("detail") as string,
    isRecruiting: (formData.get("isRecruiting") as string) === "on",
    recruitPeriod:
      (formData.get("isRecruiting") as string) === "on"
        ? new Date(formData.get("recruitPeriod") as string)
        : new Date(),
    applyUrl: formData.get("applyUrl") as string,
  };

  const validate = isUpdateClubFormValid(payload);

  if (!validate.success)
    return { ok: false, errors: validate.error.flatten().fieldErrors };

  const _response = await updateClub(payload._id || -1, payload);

  if (_response.code >= 400)
    return { ok: false, formError: "동아리 수정중 오류가 발생했습니다." };

  return { ok: true };
}
