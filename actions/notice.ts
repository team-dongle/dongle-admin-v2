import { CreateNoticeFormState } from "@/types/form-states";
import { NoticePayload } from "@/types/notice";
import { isCreateNoticeFormValid } from "@/actions/validators/notice";
import { createNotice } from "@/apis/notice";

export async function createNoticeDispatcher(
  state: CreateNoticeFormState | undefined,
  formData: FormData,
) {
  const attachments = formData.get("attachments") as string | undefined;
  const payload: NoticePayload = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    attachments: attachments
      ? (JSON.parse(attachments) as NoticePayload["attachments"])
      : undefined,
  };

  const validate = isCreateNoticeFormValid(payload);

  if (!validate.success)
    return { ok: false, error: validate.error.flatten().fieldErrors };

  const _response = await createNotice(payload);

  if (_response.code >= 400)
    return { ok: false, formError: "공지사항 등록중 오류가 발생했습니다." };

  return { ok: true };
}
