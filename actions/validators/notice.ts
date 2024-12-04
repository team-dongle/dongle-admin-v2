import { NoticePayload } from "@/types/notice";
import { z } from "zod";

export const isCreateNoticeFormValid = (payload: NoticePayload) => {
  const shape = z.object({
    title: z.string().min(1, { message: "게시글 제목을 입력해 주세요." }),
    content: z.string().min(1, { message: "게시글 내용을 입력해 주세요." }),
    attachments: z
      .array(
        z.object({ key: z.string(), url: z.string(), fileName: z.string() }),
      )
      .optional(),
  });

  return shape.safeParse(payload);
};
