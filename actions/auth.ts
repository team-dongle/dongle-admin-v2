"use server";

import { serviceLogin } from "@/apis/auth";
import { GeneralFormState } from "@/types/form-states";
import { cookies } from "next/headers";

export async function loginDispatcher(
  state: GeneralFormState | null,
  formData: FormData,
): Promise<GeneralFormState> {
  "use server";
  const cookieStore = await cookies();
  const payload = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  if (!payload.username || !payload.password)
    return {
      ok: false,
      errors: "아이디 혹은 비밀번호를 확인해 주세요.",
    };

  const _response = await serviceLogin(payload);

  if (_response.code === 400)
    return { ok: false, formError: "계정이 존재하지 않습니다." };

  if (_response.code === 401)
    return { ok: false, formError: "아이디 혹은 비밀번호가 틀렸습니다." };

  cookieStore.set("accessToken", _response.result.accessToken);
  cookieStore.set("refreshToken", _response.result.refreshToken);
  cookieStore.set("role", _response.result.role);

  return { ok: true };
}
