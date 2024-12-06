import { BannerPayload } from "@/types/banner";
import { z } from "zod";
import { urlRegexp } from "@/utils/regex";

export const isUploadBannerFormValid = (payload: BannerPayload) => {
  const shape = z.object({
    name: z.string().min(1, { message: "배너 이름을 입력해 주세요." }),
    description: z.string().min(1, { message: "배너 설명을 입력해 주세요." }),
    imageUrl: z
      .string()
      .min(1, { message: "배너 이미지 링크를 입력해 주세요." })
      .regex(urlRegexp, { message: "유효한 링크를 입력해 주세요." }),
    href: z
      .string()
      .min(1, { message: "배너 이미지 링크를 입력해 주세요." })
      .regex(urlRegexp, { message: "유효한 링크를 입력해 주세요." })
      .optional(),
  });

  return shape.safeParse(payload);
};
