import { ReportPayload } from "@/types/report";
import { z } from "zod";
import { urlRegexp } from "@/utils/regex";

export const isCreateReportFormValid = (payload: ReportPayload) => {
  const shape = z.object({
    title: z
      .string()
      .min(5, { message: "활동보고서 제목은 최소 5자 이상이여야 합니다." })
      .max(20, { message: "활동보고서 제목은 최대 20자 이하여야 합니다." }),
    content: z
      .string()
      .min(100, { message: "활동보고서 본문은 최소 100자 이상이여야 합니다." })
      .max(1000, { message: "활동보고서 본문은 최대 1000자 이하여야 합니다." }),
    images: z
      .array(
        z.object({
          url: z
            .string()
            .regex(urlRegexp, { message: "유효한 링크를 입력해 주세요." }),
        }),
      )
      .min(1, { message: "활동 사진은 최소 1개 이상이여야 합니다." }),
  });

  return shape.safeParse(payload);
};
