import { z } from "zod";
import { ClubPayload } from "@/types/club";
import { phoneRegexp, urlRegexp } from "@/utils/regex";

export const isCreateClubFormValid = (payload: ClubPayload) => {
  const shape = z.object({
    name: z.string().min(1, { message: "동아리 이름을 입력하세요." }),
    location: z.string().min(1, { message: "동아리 위치를 입력하세요." }),
    contact: z
      .string()
      .min(1, { message: "대표 연락처를 입력하세요." })
      .regex(phoneRegexp, { message: "유효한 전화번호를 입력해 주세요." }),
    sns: z
      .string()
      .regex(urlRegexp, { message: "유효한 링크를 입력해 주세요." })
      .optional(),
    thumbnail: z
      .array(
        z.object({
          id: z.number().optional(),
          key: z.string(),
          fileName: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
    detail: z.string().min(1, { message: "동아리 상세 정보를 입력하세요." }),
    isRecruiting: z.boolean({ message: "동아리 모집 여부를 선택해 주세요." }),
    recruitPeriod: z.union([z.string(), z.date()], {
      message: "동아리 모집 기간을 선택해 주세요.",
    }),
    applyUrl: z
      .string()
      .min(1, { message: "동아리 모집 링크를 입력해 주세요." })
      .regex(urlRegexp, { message: "유효한 링크를 입력해 주세요." }),
    logo: z.string().optional(),
    categoryId: z.number({ message: "동아리 분과를 선택해 주세요." }),
    ownerId: z.string().min(1, { message: "동아리 회장 ID를 입력해 주세요." }),
  });

  return shape.safeParse(payload);
};

export const isUpdateClubFormValid = (payload: ClubPayload) => {
  const shape = z.object({
    _id: z.number(),
    name: z
      .string()
      .min(1, { message: "동아리 이름은 1자 이상이여야 합니다." }),
    location: z
      .string()
      .min(1, { message: "동아리 위치는 1자 이상이여야 합니다." }),
    contact: z
      .string()
      .min(1, { message: "동아리 연락처는 1자 이상이여야 합니다." })
      .regex(phoneRegexp, { message: "유효한 전화번호를 입력해 주세요." }),
    sns: z
      .string()
      .min(1, { message: "동아리 SNS는 1자 이상이여야 합니다." })
      .optional(),
    thumbnail: z
      .array(
        z.object({
          id: z.number().optional(),
          key: z.string(),
          fileName: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
    detail: z
      .string()
      .min(1, { message: "동아리 소개는 1자 이상이여야 합니다." })
      .optional(),
    isRecruiting: z.boolean({ message: "동아리 모집 여부를 선택해 주세요." }),
    recruitPeriod: z.union([z.string(), z.date()], {
      message: "동아리 모집 기간을 선택해 주세요.",
    }),
    applyUrl: z
      .string()
      .min(1, { message: "동아리 모집 링크를 입력해 주세요." })
      .regex(urlRegexp, { message: "유효한 링크를 입력해 주세요." })
      .optional(),
    logo: z.string().optional(),
  });

  return shape.safeParse(payload);
};
