import { UploadBannerFormState } from "@/types/form-states";
import { isUploadBannerFormValid } from "@/actions/validators/banner";
import { createBanner } from "@/apis/banner";

export async function uploadBannerDispatcher(
  state: UploadBannerFormState | null,
  formData: FormData,
): Promise<UploadBannerFormState> {
  const payload = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    imageUrl: formData.get("imageUrl") as string,
    href: (formData.get("href") as string) || undefined,
  };

  const validate = isUploadBannerFormValid(payload);

  if (!validate.success)
    return { ok: false, errors: validate.error.flatten().fieldErrors };

  const _response = await createBanner(payload);

  if (_response.code >= 400)
    return { ok: false, formError: "배너 추가중 오류가 발생했습니다." };

  return { ok: true };
}
