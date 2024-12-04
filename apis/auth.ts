"use server";

import { fetchData } from "@/apis/fetch";
import { LoginResponse } from "@/types/response";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function serviceLogin(payload: {
  username: string;
  password: string;
}) {
  return await fetchData<LoginResponse>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
}

export async function serviceLogout() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("role");

  return redirect("/login");
}
