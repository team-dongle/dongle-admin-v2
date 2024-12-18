import { CreateReportFormState } from "@/types/form-states";
import { ReportPayload } from "@/types/report";
import { isCreateReportFormValid } from "@/actions/validators/report";
import { createReport } from "@/apis/report";

export async function createReportDispatcher(
  state: CreateReportFormState | null,
  formData: FormData,
) {
  const payload = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    images: JSON.parse(
      formData.get("images") as string,
    ) as ReportPayload["images"],
  };

  const validate = isCreateReportFormValid(payload);

  if (!validate.success)
    return { ok: false, error: validate.error.flatten().fieldErrors };

  const _response = await createReport(payload);

  if (_response.code >= 400)
    return {
      ok: false,
      formError: "활동 보고서 생성중 오류가 발생하였습니다.",
    };

  return { ok: true };
}
