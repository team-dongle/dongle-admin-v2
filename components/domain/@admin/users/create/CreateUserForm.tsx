"use client";

import React, { startTransition, useActionState, useEffect } from "react";
import FormItem from "@/components/common/form/FormItem";
import Input from "@/components/common/form/Input";
import { createUserDispatcher } from "@/actions/user";
import { useRouter } from "next/navigation";

const CreateUserForm = () => {
  const router = useRouter();
  const [state, dispatch] = useActionState(createUserDispatcher, { ok: false });

  useEffect(() => {
    if (!state.ok && state.formError) alert(state.formError);
    if (state.ok) window.location.href = "/users";
  }, [state]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = new FormData(e.currentTarget);
        startTransition(() => dispatch(form));
      }}
      className="flex h-auto w-full flex-col items-start justify-start gap-2"
    >
      <div className="relative flex h-auto w-full flex-col items-start justify-start gap-4">
        <FormItem
          label="회원 ID"
          required={true}
          error={state.errors?.username}
        >
          <Input
            type="text"
            name="username"
            placeholder="회원 ID를 입력해 주세요."
            autoComplete="off"
          />
        </FormItem>
        <FormItem
          label="비밀번호"
          required={true}
          error={state.errors?.password}
        >
          <Input
            type="password"
            name="password"
            placeholder="회원 비밀번호를 입력해 주세요."
            autoComplete="off"
          />
        </FormItem>
        <FormItem label="회원 이름" required={true} error={state.errors?.name}>
          <Input
            type="text"
            name="name"
            placeholder="회원 이름를 입력해 주세요."
            autoComplete="off"
          />
        </FormItem>
      </div>
      <div className="mt-4 flex h-auto w-full flex-row justify-end gap-4">
        <button
          type="submit"
          className="h-12 w-36 rounded-md bg-sky-500 text-white"
        >
          회원 추가
        </button>
        <button
          onClick={() => router.back()}
          className="h-12 w-36 rounded-md bg-gray-200 text-gray-400"
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;
