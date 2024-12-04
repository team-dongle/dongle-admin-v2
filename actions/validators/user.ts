import { z } from "zod";
import { UserPayload } from "@/types/user";

export const isCreateUserFormValid = (payload: UserPayload) => {
  const shape = z.object({
    username: z
      .string()
      .min(6, { message: "회원 아이디는 6자 이상이여야 합니다." }),
    password: z
      .string()
      .min(8, { message: "회원 비밀번호는 8자 이상이여야 합니다." }),
    name: z.string().min(1, { message: "회원 이름을 입력해 주세요." }),
  });

  return shape.safeParse(payload);
};
