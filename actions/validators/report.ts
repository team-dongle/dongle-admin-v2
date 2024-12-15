import { ReportPayload } from "@/types/report";
import { z } from "zod";
import { urlRegexp } from "@/utils/regex";

export const isCreateReportFormValid = (payload: ReportPayload) => {
  const shape = z.object({
    title: z.string().min(1, { message: "활동보고서 제목을 입력해 주세요." }),
    content: z
      .string()
      .min(100, { message: "활동보고서 본문은 최소 100자 이상이여야 합니다." }),
    images: z.object({
      _id: z.number(),
      url: z
        .string()
        .regex(urlRegexp, { message: "유효한 링크를 입력해 주세요." }),
    }),
  });

  return shape.safeParse(payload);
};
