import { UserPayload } from "@/types/user";
import { isCreateUserFormValid } from "@/actions/validators/user";
import { CreateUserFormState } from "@/types/form-states";
import { createUser } from "@/apis/user";

export async function createUserDispatcher(
  state: CreateUserFormState | null,
  formData: FormData,
) {
  const payload: UserPayload = {
    username: (formData.get("username") as string).toLowerCase(),
    password: formData.get("password") as string,
    name: formData.get("name") as string,
    role: "CLUB",
  };

  const validate = isCreateUserFormValid(payload);

  if (!validate.success)
    return { ok: false, errors: validate.error.flatten().fieldErrors };

  const _response = await createUser(payload);

  if (_response.code >= 400)
    return { ok: false, formError: "회원 생성중 오류가 발생했습니다." };

  return { ok: true };
}
