"use client";

import React, { useActionState } from "react";
import { loginDispatcher } from "@/actions/auth";
import { redirect } from "next/navigation";

const LoginForm = () => {
  const [state, dispatch] = useActionState(loginDispatcher, { ok: false });

  if (state.ok) redirect("/");

  return (
    <form
      action={dispatch}
      className="flex h-auto w-auto flex-col items-center justify-center gap-2"
    >
      <input
        name="username"
        type="text"
        className="h-10 w-48 rounded-md border border-gray-300 p-2 text-sm text-gray-600 outline-none transition-all duration-100 focus:outline-blue-500"
        placeholder="회원 ID"
      />
      <input
        name="password"
        type="password"
        className="h-10 w-48 rounded-md border border-gray-300 p-2 text-sm text-gray-600 outline-none transition-all duration-100 focus:outline-blue-500"
        placeholder="비밀번호"
      />
      {state.errors && (
        <span className="text-sm text-red-500">{state.errors}</span>
      )}
      {state.formError && (
        <span className="text-sm text-red-500">{state.formError}</span>
      )}
      <button className="h-10 w-48 rounded-md border-none bg-blue-500 text-sm text-white outline-none">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
