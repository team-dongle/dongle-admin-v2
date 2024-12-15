import { CreateReportFormState } from "@/types/form-states";
import { ReportPayload } from "@/types/report";
import { isCreateReportFormValid } from "@/actions/validators/report";

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

  return { ok: true };
}
